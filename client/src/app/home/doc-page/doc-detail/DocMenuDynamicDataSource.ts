import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {DocMenu, DocMenuDynamicFlatNode} from '../../../core/services/entity/Docs';
import {BehaviorSubject, map, merge, Observable} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {randomString} from '../../../core/services/utils/Uuid';
import {DocService} from '../../../core/services/impl/doc.service';

export class DocMenuDynamicDataSource implements DataSource<DocMenuDynamicFlatNode> {
  dataChange = new BehaviorSubject<DocMenuDynamicFlatNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<DocMenuDynamicFlatNode>,
    private docService: DocService,
    private trans: (item: DocMenu) => DocMenuDynamicFlatNode
  ) {
  }

  get data(): DocMenuDynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DocMenuDynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<DocMenuDynamicFlatNode[]> {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DocMenuDynamicFlatNode>).added ||
        (change as SelectionChange<DocMenuDynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DocMenuDynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DocMenuDynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DocMenuDynamicFlatNode, expand: boolean) {
    const itemCount = node.itemCount;
    const index = this.data.indexOf(node);
    if (itemCount === 0 || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }
    if (expand){
      node.isLoading = true;
      this.getSubMenu(node.id).then((subMenus: DocMenu[]) => {
        const nodes = [];
        subMenus.forEach(item => {
          nodes.push(this.trans(item));
        });
        this.data.splice(index + 1, 0, ...nodes);
        node.isLoading = false;
        this.dataChange.next(this.data);
      });
    }else {
      let count = 0;
      for (
        let i = index + 1;
        i < this.data.length && this.data[i].level > node.level;
        i++, count++
      ) {
      }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
    }
  }

  public async addBaseLevel(id: number): Promise<DocMenu>  {
    const menu = await this.docService.addBaseDocMenuItem(id);
    this.data.push(this.trans(menu));
    this.dataChange.next(this.data);
    return new Promise(resolve => {
      resolve(menu);
    });
  }

  public async addSubLevel(parentId: number, parentLevel: number, docId: number, itemCount) {
    const menu = await this.docService.addSubLevel(parentId, docId, parentLevel + 1);
    this.docService.updateDocItemCount(parentId, itemCount + 1).then(r => {
    });
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === parentId) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.data[index].itemCount = itemCount + 1;
      if (this.treeControl.isExpanded(this.data[index])) {
        this.data.splice(index + itemCount + 1, 0, this.trans(menu));
      }else {
        this.data[index].expandable = true;
      }
      this.dataChange.next(this.data);
    }
  }

  updateName(info: { name: string; id: number }) {
    this.data.forEach(item => {
      if (item.id === info.id) {
        item.name = info.name;
        this.docService.updateName(info);
      }
    });
  }

  private async getSubMenu(id: number): Promise<DocMenu[]> {
    return this.docService.getSubMenu(id);
  }
}
