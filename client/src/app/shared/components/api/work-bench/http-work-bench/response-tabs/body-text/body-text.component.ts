import { Component, OnInit } from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';

@Component({
  selector: 'app-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss']
})
export class BodyTextComponent implements OnInit {
  bodyType = 'json';
  editorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  code = '{}';
  showType = 'Pretty';
  editor: MonacoStandaloneCodeEditor;

  constructor() {
  }

  ngOnInit(): void {
  }

  onBodyTypeChange($event: any): void {
  }

  doCopy(): void {
  }

  toggleSearch() {
    if (this.showType !== 'Pretty' || !this.editor) {
      return;
    }
    this.editor.focus();
    this.editor.getAction('actions.find').run();

  }

  initEditor(e: MonacoStandaloneCodeEditor) {
    this.editor = e;
  }
}
