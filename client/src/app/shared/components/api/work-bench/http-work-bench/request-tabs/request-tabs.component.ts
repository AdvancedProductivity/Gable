import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {QueryTableComponent} from './query-table/query-table.component';
import {FormEditorComponent} from './form-editor/form-editor.component';
import {ApiKeyValueChangeEvent} from '../../../../../../core/services/entity/ApiPart';

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit, OnDestroy {
  @Output() reqTabChanged = new EventEmitter<string>();
  @ViewChild('query', {static: true}) query: QueryTableComponent;
  @ViewChild(FormEditorComponent)
  formEditor!: FormEditorComponent;
  tabs = ['Query Param', 'Header', 'Body', 'Pre-Script', 'Post-Script'];
  curTab = 'Query Param';

  constructor() {
  }

  ngOnInit(): void {
    this.query.setData(null);
  }

  public getData(): any {
    const data: any = {};
    data.query = this.query.getData();
    data.form = this.formEditor.getData();
    return data;
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
}
