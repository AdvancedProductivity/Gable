import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';

import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {debounceTime, distinctUntilChanged, Subject, Subscription} from 'rxjs';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {
  ApiMenuCollection,
  MenuEvent,
  MenuSelectedEvent,
  MatApiFlatNode
} from '../../../../core/services/entity/ApiMenu';
import {NavTabImplService} from '../../../../core/services/impl/nav-tab-impl.service';
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-api-tree-menu',
  templateUrl: './api-tree-menu.component.html',
  styleUrls: ['./api-tree-menu.component.scss']
})
export class ApiTreeMenuComponent implements OnInit, OnDestroy {
  @Output()
  ready = new EventEmitter();
  @ViewChild(PerfectScrollbarDirective, { static: false }) ps?: PerfectScrollbarDirective;
  subscription: Subscription;
  focusSubscription: Subscription;
  menuData: ApiMenuCollection[];
  selectedId: number;
  isSelectCollection = false;
  focusEvent: MenuSelectedEvent;
  haveOperating = false;
  empty = true;
  searchText = '';
  searchTextSubject = new Subject<string>();
  treeControl = new FlatTreeControl<MatApiFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (node: any, level: number) => {
      const isC = node.type === 'c';
      return {
        expandable: (!!node.children && node.children.length > 0) || isC,
        name: node.name,
        visible: true,
        level,
        id: node.id,
        collectionId: isC ? node.id : node.collectionId,
        type: node.type,
      };
    },
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
    this.searchTextSubject.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(value => {
        this.handleSearchChange(value);
      });
    this.menuService.getMenus().subscribe(res => {
      this.menuData = res;
      this.dataSource.data = this.menuData;
      this.handleShowingStatus();
      this.handleExpandAndScroll();
      this.ready.next({});
    });
    this.subscription = this.menuService.actions().subscribe(this.menuEventHandler);
    this.focusSubscription = this.navTabImplService.getFocusMenu().subscribe(this.handleFocusSelect);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.searchTextSubject.unsubscribe();
  }
  hasChild = (_: number, node: MatApiFlatNode) => node.expandable;


  onSelected(node): void {
    if (this.haveOperating) {
      return;
    }
    this.selectedId = node.id;
    if (!this.treeControl.isExpanded(node)) {
      this.treeControl.toggle(node);
    }
    this.isSelectCollection = node.type === 'c';
    this.navTabImplService.openTabs({
      name: node.name,
      id: node.id,
      collectionId: node.collectionId,
      type: this.isSelectCollection ? 'collection' : 'http',
    }, true, false);
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
    this.searchTextSubject.next(data);
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
    if (this.haveOperating) {
      this.haveOperating = false;
    }
    if (res.name === 'add') {
      this.dataSource.data = this.menuData;
      const newId = res.data.id;
      this.navTabImplService.openTabs({
        name: res.data.name,
        id: newId,
        type: 'collection',
      }, true, true);
      this.handleShowingStatus();
    } else if (res.name === 'rename') {
      this.dataSource.data = this.menuData;
      this.handleExpandAndScroll();
    } else if (res.name === 'addHttp') {
      this.dataSource.data = this.menuData;
      const newId = res.data.id;
      this.navTabImplService.openTabs({
        name: res.data.name,
        id: newId,
        collectionId: res.data.collectionId,
        type: 'http',
      }, true, true);
    }
  };

  private handleFocusSelect = (event: MenuSelectedEvent) => {
    this.focusEvent = event;
    this.handleExpandAndScroll();
  };

  private handleExpandAndScroll() {
    if (!this.focusEvent || !this.menuData) {
      console.log('ignore menu focus');
      return;
    }
    this.isSelectCollection = this.focusEvent.isCollection;
    if (this.focusEvent.isCollection) {
      this.selectedId = this.focusEvent.apiId;
    } else {
      this.selectedId = this.focusEvent.apiId;
      let node;
      try {
        this.treeControl.dataNodes.forEach(item => {
          // @ts-ignore
          if (item.type === 'c' && item.id === this.focusEvent.collectionId) {
            node = item;
            throw new Error();
          }
        });
      } catch (e) {
      }
      if (node && !this.treeControl.isExpanded(node)) {
        this.treeControl.toggle(node);
      }
    }
    this.handleScroll();
  }

  /**
   * calculate the height need to scroll.
   * */
  private handleScroll() {
    if (this.focusEvent.fromMenu) {
      console.log('ignore scroll');
      return;
    }
    setTimeout(() => {
      let index = 0;
      try {
        let curIsExpand = true;
        this.treeControl.dataNodes.forEach(item => {
          // @ts-ignore
          const type = item.type;
          if (type === 'c') {
            if (this.focusEvent.isCollection) {
              if (item.id === this.focusEvent.collectionId) {
                throw new Error();
              } else {
                curIsExpand = this.treeControl.isExpanded(item);
                index++;
              }
            } else {
              curIsExpand = this.treeControl.isExpanded(item);
              index++;
            }
          } else {
            if (this.focusEvent.isCollection) {
              if (curIsExpand) {
                index++;
              }
            } else {
              if (curIsExpand && item.id === this.focusEvent.apiId) {
                throw new Error();
              }
            }
          }
        });
      } catch (e) {
      }
      this.ps.scrollToY(index * 40);
    }, 20);
  }

  private handleSearchChange(str: string) {
    if (str) {
      this.filterByName(str);
    } else {
      this.clearFilter();
    }
  }
}
