import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {QueryTableComponent} from './query-table/query-table.component';
import {FormEditorComponent} from './form-editor/form-editor.component';
import {ApiKeyValueChangeEvent} from "../../../../../../core/services/entity/ApiPart";

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit {
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
}
