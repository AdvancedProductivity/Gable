import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuCollection} from '../../../../core/services/entity/ApiMenu';


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  id: number;
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
export class ApiTreeMenuComponent implements OnInit, OnDestroy {
  @Output()
  selectMenu = new EventEmitter();
  @Output()
  ready = new EventEmitter();
  subscription: Subscription;
  menuData: ApiMenuCollection[];
  selectedId: number;
  haveOperating = false;
  searchText = '';
  empty = true;
  subject = new Subject<string>();
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (node: ApiMenuCollection, level: number) => ({
      expandable: (!!node.children && node.children.length > 0) || node.type === 'c',
      name: node.name,
      visible: true,
      level,
      id: node.id,
      type: node.type,
    }),
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private menuService: ApiMenuServiceImpl) {
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
    this.menuService.getMenus().subscribe(res => {
      this.menuData = res;
      this.dataSource.data = this.menuData;
      this.handleShowingStatus();
      this.ready.next({});
    });
    this.subscription = this.menuService.actions().subscribe(res => {
      if (res.name === 'add') {
        this.selectMenu.next({name: res.data.name, id: res.data.id, type: 'collection', isCreated: true});
        this.dataSource.data = this.menuData;
        this.handleShowingStatus();
      }else if (res.name === 'rename') {
        this.dataSource.data = this.menuData;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  onSelected(node): void {
    if (this.haveOperating) {
      return;
    }
    this.selectedId = node.id;
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
    this.selectMenu.next({
      name: node.name,
      id: node.id,
      type: node.type === 'c' ? 'collection' : 'http',
      isCreated: false
    });
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

  addCollection(): void {
    this.menuService.addCollection('New Collection');
  }

  addHttp(id: any): void {
    console.log('add http for id: ', id);
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

  private handleShowingStatus() {
    if (Array.isArray(this.menuData) && this.menuData.length === 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
  }
}
