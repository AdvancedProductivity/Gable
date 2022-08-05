import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {QueryTableComponent} from './query-table/query-table.component';
import {FormEditorComponent} from './form-editor/form-editor.component';
import {ApiKeyValueChangeEvent} from '../../../../../../core/services/entity/ApiPart';
import {HttpApi} from '../../../../../../core/services/entity/HttpApi';
import {BodyContainerComponent} from './body-container/body-container.component';

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit, OnDestroy {
  @Output() reqTabChanged = new EventEmitter<string>();
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

  public getData(): any {
    return this.apiData;
  }

  onPartChange(data: ApiKeyValueChangeEvent) {
    console.log(data.field + ' changed', data.data);
  }

  onBodyTypeChange(type: string) {
    console.log('body type changed to be ', type);
  }

  onBodyTextTypeChange(type: string) {
    console.log('body text type changed to be ', type);
  }

  selectTab(tab: string) {
    this.curTab = tab;
    this.reqTabChanged.next(tab);
  }

  ngOnDestroy(): void {
    this.reqTabChanged.unsubscribe();
  }

  private dispatchData(httpApi: HttpApi) {
    this.query.setData(httpApi.query);
    this.header.setData(httpApi.header);
    this.body.setBodyData(httpApi);
  }
}
