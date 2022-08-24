import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {debounceTime, Subject} from 'rxjs';
import {DocJsonTableNode} from '../../../../../../../core/services/entity/Docs';
import {JsonTableEditorComponent} from '../../json-table-editor/json-table-editor.component';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit, OnDestroy {
  @Output() contentChange = new EventEmitter<string>();
  @Output() bodyDocChange = new EventEmitter<DocJsonTableNode[]>();
  @ViewChild('dataEditorComponent', {static: false}) treeDataEditorComponent: JsonTableEditorComponent;
  isEditingDoc = false;
  isInDoc = false;
  editorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  code = '{}';
  editor: MonacoStandaloneCodeEditor;
  contentSubject = new Subject<void>();

  constructor() {
  }

  ngOnInit(): void {
    this.contentSubject.pipe(debounceTime(2000))
      .subscribe(() => {
        console.log('body changed');
        this.contentChange.next(this.code);
      });
  }

  setBodyLang(language): void {
    this.editorOptions = {...this.editorOptions, language};
  }

  setBodyText(bodyContent): void {
    this.code = bodyContent;
  }

  initEditor(e: MonacoStandaloneCodeEditor) {
    this.editor = e;
    e.onDidChangeModelContent((ey) => {
      this.contentSubject.next();
    });
  }

  ngOnDestroy(): void {
    this.contentSubject.unsubscribe();
  }

  markEditing() {
    this.isEditingDoc = true;

  }

  markExistEditing() {
    this.isEditingDoc = false;
  }

  setBodyTextDoc(bodyTextDoc: any) {
    this.treeDataEditorComponent.setDocData(bodyTextDoc);
  }

  onBodyDocChanged(newDoc: DocJsonTableNode[]) {
    this.bodyDocChange.next(newDoc);
  }

  appendDoc() {
    try {
      const data = JSON.parse(this.code);
      this.treeDataEditorComponent.gen(data);
    } catch (e){
      console.error('parser error');
    }
  }
}
