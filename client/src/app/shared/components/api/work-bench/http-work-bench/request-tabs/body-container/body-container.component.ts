import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TextBodyComponent} from '../text-body/text-body.component';
import {
  ApiFormKeyValueChangeEvent,
  ApiKeyValueChangeEvent,
  GraphQlPartChangeEvent
} from '../../../../../../../core/services/entity/ApiPart';
import {HttpApi} from "../../../../../../../core/services/entity/HttpApi";
import {FormEditorComponent} from "../form-editor/form-editor.component";
import {QueryTableComponent} from "../query-table/query-table.component";
import {GraphQLComponent} from "../graph-ql/graph-ql.component";

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent implements OnInit, OnDestroy {
  @Output() bodyTypeChange = new EventEmitter<string>();
  @Output() bodyTextTypeChange = new EventEmitter<string>();
  @ViewChild('editorBody', {static: true}) editorBody: TextBodyComponent;
  @ViewChild('form', {static: true}) form: FormEditorComponent;
  @ViewChild('url_encode', {static: true}) urlEncode: QueryTableComponent;
  @ViewChild('graph_ql', {static: true}) graphQLComponent: GraphQLComponent;
  curTyp = 'none';
  rawType = 'json';
  types = [
    {name: 'none', type: 'none'}
    , {name: 'form-data', type: 'form_data'}
    , {name: 'x-www-form-urlencoded', type: 'urlencoded'}
    , {name: 'raw', type: 'raw'}
    , {name: 'GraphQL', type: 'graphQL'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  public setBodyData(httpApi: HttpApi) {
    this.rawType = httpApi.bodyTextType;
    this.editorBody.setBodyLang(this.rawType);
    this.form.setData(httpApi.bodyForm);
    this.graphQLComponent.setVar(httpApi.bodyGraphQlVar);
    this.graphQLComponent.setQuery(httpApi.bodyGraphQlQuery);
    this.urlEncode.setData(httpApi.bodyUrlEncoded);
  }

  onTypeChange(data: any): void {
    this.bodyTypeChange.next(data);
  }

  onBodyChange(data: string): void {
    this.editorBody.setBodyLang(data);
    this.bodyTextTypeChange.next(data);
  }

  onBeautify(): void {
  }

  onPartChange(data: ApiKeyValueChangeEvent) {
    console.log(data.field + ' changed', data.data);
  }

  onFormChange(data: ApiFormKeyValueChangeEvent) {
    console.log(data.field + ' changed', data.data);
  }

  onBodyContentChange(newContent: string) {
    console.log('body content changed', newContent);
  }

  onGraphChange(newContent: GraphQlPartChangeEvent) {
    console.log('graph ql %s change', newContent.type, newContent.content);
  }

  ngOnDestroy(): void {
    this.bodyTypeChange.unsubscribe();
    this.bodyTextTypeChange.unsubscribe();
  }
}
