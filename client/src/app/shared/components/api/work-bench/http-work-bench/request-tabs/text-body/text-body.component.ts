import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit, OnDestroy {
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
    this.contentSubject.pipe(debounceTime(500))
      .subscribe(() => {
      });
  }

  setBodyLang(language): void {
    this.editorOptions = {...this.editorOptions, language};
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
}
