import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {TextBodyComponent} from '../text-body/text-body.component';
import {
  ApiFormKeyValueChangeEvent,
  ApiKeyValueChangeEvent,
  GraphQlPartChangeEvent, HttpComponentHotDataUpdateEvent
} from '../../../../../../../core/services/entity/ApiPart';
import {HttpApi} from '../../../../../../../core/services/entity/HttpApi';
import {FormEditorComponent} from '../form-editor/form-editor.component';
import {QueryTableComponent} from '../query-table/query-table.component';
import {GraphQLComponent} from '../graph-ql/graph-ql.component';
import {DocJsonTableNode} from '../../../../../../../core/services/entity/Docs';
import {AnalysisService} from "../../../../../../../core/services/analysis.service";

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent implements OnInit, OnDestroy {
  @Output() bodyTypeChange = new EventEmitter<string>();
  @Output() bodyTextTypeChange = new EventEmitter<string>();
  @Output() contentChange = new EventEmitter<HttpComponentHotDataUpdateEvent>();
  @ViewChild('editorBody', {static: true}) editorBody: TextBodyComponent;
  @ViewChild('form', {static: true}) form: FormEditorComponent;
  @ViewChild('url_encode', {static: true}) urlEncode: QueryTableComponent;
  @ViewChild('graph_ql', {static: true}) graphQLComponent: GraphQLComponent;
  isEditingDoc = false;
  isFull = false;
  isInDoc = false;
  curTyp = 'none';
  rawType = 'json';
  types = [
    {name: 'none', type: 'none'}
    , {name: 'form-data', type: 'form_data'}
    , {name: 'urlencoded', type: 'urlencoded'}
    , {name: 'raw', type: 'raw'}
    , {name: 'GraphQL', type: 'graphQL'}
  ];

  constructor(private analysisService: AnalysisService) {
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
    this.editorBody.setBodyText(httpApi.bodyText);
    this.editorBody.setBodyTextDoc(httpApi.bodyTextDoc);
    if (this.isEditingDoc) {
      this.isEditingDoc = false;
      this.editorBody.markExistEditing();
    }
  }

  public setBodyType(httpApi: HttpApi) {
    this.curTyp = httpApi.bodyType;
  }

  onTypeChange(data: any): void {
    this.bodyTypeChange.next(data);
  }

  onBodyChange(data: string): void {
    this.editorBody.setBodyLang(data);
    this.bodyTextTypeChange.next(data);
    this.editorBody.markExistEditing();
  }

  public setIsInDoc() {
    this.isInDoc = true;
    this.editorBody.setIsInDoc();
  }

  onPartChange(data: ApiKeyValueChangeEvent) {
    this.contentChange.next({action: data.field, data: data.data});
  }

  onFormChange(data: ApiFormKeyValueChangeEvent) {
    this.contentChange.next({action: data.field, data: data.data});
  }

  onBodyContentChange(newContent: string) {
    this.contentChange.next({action: 'raw', data: newContent});
  }

  onBodyDocChange(newDoc: DocJsonTableNode[]) {
    this.contentChange.next({action: 'bodyDoc', data: newDoc});
  }

  onGraphChange(newContent: GraphQlPartChangeEvent) {
    this.contentChange.next({action: newContent.type, data: newContent.content});
  }

  ngOnDestroy(): void {
    this.bodyTypeChange.unsubscribe();
    this.bodyTextTypeChange.unsubscribe();
    this.contentChange.unsubscribe();
  }


  doFullScreen(): void {
    this.isFull = !this.isFull;
    this.analysisService.fullScreen('request', this.isInDoc).then(r => {});
  }

  generateDoc() {
    if (this.isEditingDoc) {
      this.isEditingDoc = false;
      this.editorBody.markExistEditing();
    }else {
      this.isEditingDoc = true;
      this.editorBody.markEditing();
    }
  }

  appendDoc() {
    if (this.isEditingDoc) {
      this.editorBody.appendDoc();
    }
  }
}
