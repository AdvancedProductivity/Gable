import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {debounceTime, Subject} from 'rxjs';
import {GraphQlPartChangeEvent} from '../../../../../../../core/services/entity/ApiPart';

@Component({
  selector: 'app-graph-ql',
  templateUrl: './graph-ql.component.html',
  styleUrls: ['./graph-ql.component.scss']
})
export class GraphQLComponent implements OnInit, OnDestroy {
  @Output() contentChange = new EventEmitter<GraphQlPartChangeEvent>();
  graphQlSubject = new Subject<boolean>();
  queryEditorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'text'
  };
  query = '';
  dataEditorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  data = '';
  queryEditor: MonacoStandaloneCodeEditor;
  varEditor: MonacoStandaloneCodeEditor;

  constructor() {
  }

  ngOnDestroy(): void {
    this.graphQlSubject.unsubscribe();
  }

  ngOnInit(): void {
    this.graphQlSubject.pipe(debounceTime(1000))
      .subscribe((isVar: boolean) => {
        if (isVar) {
          this.contentChange.next({type: 'var', content: this.data});
        }else {
          this.contentChange.next({type: 'query', content: this.query});
        }
      });
  }

  initVarEditor(editor: MonacoStandaloneCodeEditor) {
    this.varEditor = editor;
    editor.onDidChangeModelContent((ey) => {
      this.graphQlSubject.next(true);
    });
  }

  initQueryEditor(editor: MonacoStandaloneCodeEditor) {
    this.queryEditor = editor;
    editor.onDidChangeModelContent((ey) => {
      this.graphQlSubject.next(false);
    });
  }

  public setVar(v: any) {
    this.data = v;
  }

  public setQuery(v: any) {
    this.query = v;
  }
}
