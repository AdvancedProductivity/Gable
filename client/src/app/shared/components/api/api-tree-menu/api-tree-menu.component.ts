import { Component, OnInit } from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'FruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-api-tree-menu',
  templateUrl: './api-tree-menu.component.html',
  styleUrls: ['./api-tree-menu.component.scss']
})
export class ApiTreeMenuComponent implements OnInit {
  private _transformer = (node: FoodNode, level: number) => ({
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  });

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  ngOnInit(): void {
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


}
