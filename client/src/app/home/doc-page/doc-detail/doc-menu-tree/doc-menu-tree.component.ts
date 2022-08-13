import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import {DocMenuDynamicFlatNode} from '../../../../core/services/entity/Docs';
import {DocMenuDynamicDataSource} from '../DocMenuDynamicDataSource';


const TREE_DATA: DocMenuDynamicFlatNode[] = [
  {
    id: 0,
    name: 'Fruit',
    itemCount: 3,
    level: 1,
  },
  {
    id: 0,
    name: 'Vegetables',
    level: 1,
    itemCount: 6
  },
];

@Component({
  selector: 'app-doc-menu-tree',
  templateUrl: './doc-menu-tree.component.html',
  styleUrls: ['./doc-menu-tree.component.scss']
})
export class DocMenuTreeComponent implements OnInit {
  isSelectId: string;
  selectedId: string;

  treeControl = new FlatTreeControl<DocMenuDynamicFlatNode>(
    node => node.level,
    node => node.itemCount > 0,
  );

  dataSource = new DocMenuDynamicDataSource(this.treeControl);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
    this.treeControl.expansionModel.changed.subscribe(change => {
      if (change.added) {
        change.added.forEach(node => {

        });
      }
      console.log('zzq see changed', change);
    });
  }


  hasChild = (_: number, node: DocMenuDynamicFlatNode) => node.itemCount > 0;

  onSelected(node): void {
    this.selectedId = node.name;
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
  }

  onDbClick(node): void {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
  }

  addSub(node) {
  }
}
