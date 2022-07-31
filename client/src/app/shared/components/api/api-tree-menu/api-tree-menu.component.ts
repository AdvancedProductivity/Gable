import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

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
    name: 'FruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFruitFrui',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'}
    ],
  },
  {
    name: 'Vegetables',
    children: [
      {name: 'Broccoli'}, {name: 'Brussels sprouts'},
      {name: 'Pumpkins'}, {name: 'Carrots'}
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  visible: boolean;
  level: number;
}

@Component({
  selector: 'app-api-tree-menu',
  templateUrl: './api-tree-menu.component.html',
  styleUrls: ['./api-tree-menu.component.scss']
})
export class ApiTreeMenuComponent implements OnInit {
  @Output()
  selectMenu = new EventEmitter();
  @Output()
  ready = new EventEmitter();
  selectedId = '';
  haveOperating = false;
  searchText = '';
  empty = true;
  subject = new Subject<string>();
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (node: FoodNode, level: number) => ({
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      visible: true,
      level
    }),
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
  }

  ngOnInit(): void {
    this.subject.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        if (value) {
          this.filterByName(value);
        } else {
          this.clearFilter();
        }
      });
    setTimeout(() => {
      const treeData = this.getMenus();
      if (Array.isArray(treeData) && treeData.length === 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
      this.dataSource.data = TREE_DATA;
      this.ready.next({});
    }, 2000);
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  onSelected(node, isCollection: boolean): void {
    if (this.haveOperating) {
      return;
    }
    this.selectedId = node.name;
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
    this.selectMenu.next({name: node.name, id: 1, type: isCollection ? 'collection' : 'http'});
  }

  onDbClick(node): void {
    if (this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
  }

  onFilter(data: any): void {
    if (this.empty) {
      return;
    }
    this.subject.next(data);
  }

  clearFilter(): void {
    this.treeControl.dataNodes.forEach(x => x.visible = true);
  }

  private filterByName(term: string): void {
    const filteredItems = this.treeControl.dataNodes.filter(
      x => x.name.toLowerCase().indexOf(term.toLowerCase()) === -1
    );
    filteredItems.map(x => {
      x.visible = false;
    });

    const visibleItems = this.treeControl.dataNodes.filter(
      x => x.name.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
    visibleItems.map( x => {
      x.visible = true;
    });
  }

  private getMenus() {
    for (let i = 0; i < 400; i++) {
      TREE_DATA[0].children.push({name: 'idnex_' + i});
    }
    return TREE_DATA;
  }
}
