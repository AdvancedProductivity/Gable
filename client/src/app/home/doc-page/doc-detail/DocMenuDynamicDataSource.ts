import {CollectionViewer, SelectionChange, DataSource} from '@angular/cdk/collections';
import {DocMenuDynamicFlatNode} from '../../../core/services/entity/Docs';
import {BehaviorSubject, map, merge, Observable} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {randomString} from '../../../core/services/utils/Uuid';

export class DocMenuDynamicDataSource implements DataSource<DocMenuDynamicFlatNode> {
  dataChange = new BehaviorSubject<DocMenuDynamicFlatNode[]>([]);

  constructor(
    private treeControl: FlatTreeControl<DocMenuDynamicFlatNode>
  ) {}

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
      const children = [];
      for (let i = 0; i < itemCount; i++) {
        children.push({
          id: new Date().getTime(),
          name: randomString(10),
          itemCount: 0
        });
      }
      node.isLoading = true;
      setTimeout(() => {
        const nodes = children.map(
          item => new DocMenuDynamicFlatNode(item.id, item.name, 0, node.level + 1, false),
        );
        this.data.splice(index + 1, 0, ...nodes);
        node.isLoading = false;
        this.dataChange.next(this.data);
      }, 1000);
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
}
