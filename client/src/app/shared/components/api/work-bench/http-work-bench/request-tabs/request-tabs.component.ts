import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {QueryTableComponent} from './query-table/query-table.component';
import {FormEditorComponent} from './form-editor/form-editor.component';
import {ApiKeyValueChangeEvent, HttpComponentHotDataUpdateEvent} from '../../../../../../core/services/entity/ApiPart';
import {HttpApi} from '../../../../../../core/services/entity/HttpApi';
import {BodyContainerComponent} from './body-container/body-container.component';

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit, OnDestroy {
  @Output() reqTabChanged = new EventEmitter<string>();
  @Output() dataChanged = new EventEmitter<HttpComponentHotDataUpdateEvent>();
  @ViewChild('query', {static: true}) query: QueryTableComponent;
  @ViewChild('header', {static: true}) header: QueryTableComponent;
  @ViewChild('body', {static: true}) body: BodyContainerComponent;
  @ViewChild(FormEditorComponent) formEditor!: FormEditorComponent;
  apiData: HttpApi;
  isInDoc = false;
  tabs: { name: string; showP: boolean; count: number }[] = [
    {name: 'Query Param', showP: false, count: 0 },
    {name: 'Header', showP: false, count: 0 },
    {name: 'Body', showP: false, count: 0 },
    {name: 'Pre-Script', showP: false, count: 0 },
    {name: 'Post-Script', showP: false, count: 0 }
   ];
  curTab = 'Query Param';

  constructor() {
  }

  ngOnInit(): void {
  }

  public setIsInDoc() {
    this.isInDoc = true;
    this.body.setIsInDoc();
  }

  public setHttpData(httpApi: HttpApi) {
    this.apiData = httpApi;
    this.dispatchData(httpApi);
  }

  onPartChange(data: ApiKeyValueChangeEvent) {
    if (data.field === 'query') {
      this.dataChanged.next({action: 'query', data: data.data});
      this.updateTabStatus(this.apiData);
    }
    if (data.field === 'header') {
      this.dataChanged.next({action: 'header', data: data.data});
      this.updateTabStatus(this.apiData);
    }
  }

  onBodyContentChanged(e: HttpComponentHotDataUpdateEvent) {
    this.dataChanged.next(e);
    this.updateTabStatus(this.apiData);
  }

  onBodyTypeChange(type: string) {
    this.dataChanged.next({action: 'bodyType', data: type});
  }

  onBodyTextTypeChange(type: string) {
    this.dataChanged.next({action: 'bodyTextType', data: type});
  }

  selectTab(tab: string) {
    this.curTab = tab;
    this.reqTabChanged.next(tab);
  }

  ngOnDestroy(): void {
    this.reqTabChanged.unsubscribe();
    this.dataChanged.unsubscribe();
  }

  public updateTabStatus(httpApi: HttpApi) {
    if (Array.isArray(httpApi.query)) {
      this.tabs[0].showP = httpApi.query.length - 1 > 0;
    }else {
      this.tabs[0].showP = false;
    }
    this.tabs[2].showP = (httpApi.method === 'POST' || httpApi.method === 'PUT') && httpApi.bodyType !== 'none';
  }

  private dispatchData(httpApi: HttpApi) {
    this.updateTabStatus(httpApi);
    if (Array.isArray(httpApi.header)) {
      this.tabs[1].count = httpApi.header.length - 1;
    }else {
      this.tabs[1].count = 0;
    }
    this.query.setData(httpApi.query);
    this.header.setData(httpApi.header);
    this.body.setBodyType(httpApi);
    this.body.setBodyData(httpApi);
  }
}
