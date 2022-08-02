import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuCollection, MenuEvent} from '../../../../core/services/entity/ApiMenu';
import {NavTabImplService} from '../../../../core/services/impl/nav-tab-impl.service';


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

  constructor(
    private menuService: ApiMenuServiceImpl,
    private navTabImplService: NavTabImplService) {
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
    this.subscription = this.menuService.actions().subscribe(this.menuEventHandler);
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
    this.navTabImplService.openTabs({
      name: node.name,
      id: node.id,
      type: node.type === 'c' ? 'collection' : 'http',
    }, false);
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

  /**
   * add collection menu
   *
   * the status flow
   * treeMenu -> menuService -> menuActionListener send add event -> treeMenu ReRender
   * -> NavTabImplService open tabs -> collection workbench render
   * */
  addCollection(): void {
    this.menuService.addCollection('New Collection');
  }

  /**
   * add Http Test
   *
   * the status flow
   * treeMenu -> menuService -> menuActionListener send add Http event -> treeMenu ReRender
   * -> NavTabImplService open tabs -> http workbench render
   * */
  addHttp(id: any): void {
    this.menuService.addHttp('New Request', id);
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

  private menuEventHandler = (res: MenuEvent) => {
    if (res.name === 'add') {
      this.dataSource.data = this.menuData;
      this.navTabImplService.openTabs({
        name: res.data.name,
        id: res.data.id,
        type: 'collection',
      }, true);
      this.handleShowingStatus();
    } else if (res.name === 'rename') {
      this.dataSource.data = this.menuData;
    } else if (res.name === 'addHttp') {
      this.dataSource.data = this.menuData;
      this.dataSource.data = this.menuData;
      this.navTabImplService.openTabs({
        name: res.data.name,
        id: res.data.id,
        type: 'http',
      }, true);
    }
  };
}
