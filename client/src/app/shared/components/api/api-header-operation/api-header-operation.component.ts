import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {NavTabImplService} from '../../../../core/services/impl/nav-tab-impl.service';

@Component({
  selector: 'app-api-header-operation',
  templateUrl: './api-header-operation.component.html',
  styleUrls: ['./api-header-operation.component.scss']
})
export class ApiHeaderOperationComponent implements OnInit {
  @ViewChild('apiNameInput', {static: false}) input: HTMLElement;
  @Output() discard = new EventEmitter<any>();
  isInDoc = false;
  defineId: number;
  apiId: number;
  collectionId: number;
  oldVersion: number;
  newVersion: number;
  showIcon = false;
  showEdit = false;
  collectionName = '';
  apiName = '';
  apiNameCopy = '';

  constructor(
    private menuService: ApiMenuServiceImpl,
    private navTabImplService: NavTabImplService
  ) {
  }

  ngOnInit(): void {
  }

  public setIsInDoc(){
    this.isInDoc = true;
  }

  /**
   * set the http header bar name,collection name ...
   * */
  setInitStatus(id: number, collectionId: number, name: string, isEdit: boolean, version: number, defineId: number,
                collectionName?: string) {
    if (!collectionName) {
      this.menuService.getCollectionName(collectionId).subscribe(res => {
        this.collectionName = res;
      });
    } else {
      this.collectionName = collectionName;
    }
    this.oldVersion = version;
    this.apiId = id;
    this.defineId = defineId;
    this.apiName = name;
    this.collectionId = collectionId;
    this.apiNameCopy = name;
    if (isEdit) {
      this.editName();
    }
  }

  selectChange(data: any): void {
    if (data === undefined) {
      return;
    }
  }

  editName(): void {
    this.showEdit = true;
    setTimeout(() => {
      const input = document.getElementById('apiNameInput');
      input.focus();
    }, 5);
  }

  setCacheVersion(version: number) {
    this.newVersion = version;
  }

  updateName(): void {
    this.showIcon = false;
  }

  saveApiName() {
    if (this.showEdit) {
      this.showEdit = false;
      return;
    }
    this.menuService.upgradeHttpDefine(this.collectionId, this.apiId, this.defineId).subscribe(res => {
      this.oldVersion = this.newVersion;
    });
  }

  copyLink(): void {
  }

  updateApiName() {
    this.showEdit = false;
    if (!this.apiName) {
      this.apiName = this.apiNameCopy;
      return;
    }
    this.apiNameCopy = this.apiName;
    // update tree‘s name
    this.menuService.updateApiName(this.apiId, this.collectionId, this.apiName);
    // update tab's name
    this.navTabImplService.updateTabName(this.apiId, 'http', this.apiName);
  }

  discardChange(): void {
    this.discard.next({});
  }
}
