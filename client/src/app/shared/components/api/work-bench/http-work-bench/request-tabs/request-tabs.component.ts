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
  tabs = ['Query Param', 'Header', 'Body', 'Pre-Script', 'Post-Script'];
  curTab = 'Query Param';

  constructor() {
  }

  ngOnInit(): void {
  }

  public setHttpData(httpApi: HttpApi) {
    this.apiData = httpApi;
    this.dispatchData(httpApi);
  }

  onPartChange(data: ApiKeyValueChangeEvent) {
    if (data.field === 'query') {
      this.dataChanged.next({action: 'query', data: data.data});
    }
    if (data.field === 'header') {
      this.dataChanged.next({action: 'header', data: data.data});
    }
    console.log(data.field + ' changed', data.data);
  }

  onBodyContentChanged(e: HttpComponentHotDataUpdateEvent) {
    this.dataChanged.next(e);
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

  private dispatchData(httpApi: HttpApi) {
    this.query.setData(httpApi.query);
    this.header.setData(httpApi.header);
    this.body.setBodyData(httpApi);
  }
}
