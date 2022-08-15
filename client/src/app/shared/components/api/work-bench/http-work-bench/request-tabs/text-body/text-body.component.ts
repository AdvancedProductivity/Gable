import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {TreeDataEditorComponent} from '../../tree-data-editor/tree-data-editor.component';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit, OnDestroy {
  @Output() contentChange = new EventEmitter<string>();
  @ViewChild('dataEditorComponent', {static: false}) treeDataEditorComponent: TreeDataEditorComponent;
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
    this.contentSubject.pipe(debounceTime(1000))
      .subscribe(() => {
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
    this.treeDataEditorComponent.gen(JSON.parse(this.code));
  }

  markExistEditing() {
    this.isEditingDoc = false;
  }
}
