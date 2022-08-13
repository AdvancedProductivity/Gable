import {Component, Input, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DocMenu, DocMenuDynamicFlatNode} from '../../../../core/services/entity/Docs';
import {DocMenuDynamicDataSource} from '../DocMenuDynamicDataSource';
import {DocService} from '../../../../core/services/impl/doc.service';


@Component({
  selector: 'app-doc-menu-tree',
  templateUrl: './doc-menu-tree.component.html',
  styleUrls: ['./doc-menu-tree.component.scss']
})
export class DocMenuTreeComponent implements OnInit {
  @Input() id: number;
  isSelectId: number;
  selectedId: number;
  menus: DocMenu[];
  treeControl = new FlatTreeControl<DocMenuDynamicFlatNode>(
    node => node.level,
    node => node.itemCount > 0,
  );

  trans = (item: DocMenu) => new DocMenuDynamicFlatNode(
    item.id,
    item.name,
    item.itemCount,
    item.level,
    item.itemCount && item.itemCount > 0,
    false
  );
  // eslint-disable-next-line @typescript-eslint/member-ordering
  dataSource = new DocMenuDynamicDataSource(this.treeControl, this.docService, this.trans);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(
    private docService: DocService
  ) {
  }

  ngOnInit(): void {
    this.docService.getDocMenuBaseLevel(this.id).then(res => {
      this.menus = res;
      const arr = [];
      res.forEach(item => {
        arr.push(this.trans(item));
      });
      this.dataSource.data = arr;
    });
  }

  hasChild = (_: number, node: DocMenuDynamicFlatNode) => node.expandable;

  onSelected(node): void {
    this.selectedId = node.id;
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
  }

  public addNewArticle(): void {
    this.dataSource.addBaseLevel(this.id).then(m => {
      this.menus.push(m);
    });
  }
  onDbClick(node): void {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
  }

  addSub(node) {
    this.dataSource.addSubLevel(node.id, node.level, this.id, node.itemCount);
  }
}
