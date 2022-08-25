import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {BodyHtmlComponent} from './body-html/body-html.component';
import {DocJsonTableNode} from '../../../../../../../core/services/entity/Docs';
import {JsonTableEditorComponent} from '../../json-table-editor/json-table-editor.component';

@Component({
  selector: 'app-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss']
})
export class BodyTextComponent implements OnInit {
  @ViewChild('htmlContent', {static: true}) bodyContent: BodyHtmlComponent;
  @ViewChild('dataEditorComponent', {static: false}) treeDataEditorComponent: JsonTableEditorComponent;
  @Output() respDocChange = new EventEmitter<DocJsonTableNode[]>();
  isEditingDoc = false;
  isInDoc = false;
  bodyType = 'json';
  editorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  code = '{}';
  showType = 'Pretty';
  editor: MonacoStandaloneCodeEditor;
  isFull = false;
  constructor() {
  }

  ngOnInit(): void {
  }

  public setIsInDoc() {
    this.isInDoc = true;
  }

  onRespDocChange(newDoc: DocJsonTableNode[]) {
    this.respDocChange.next(newDoc);
  }

  onBodyTypeChange(lang: any): void {
    if (this.isEditingDoc) {
      this.isEditingDoc = false;
    }
    this.editorOptions = {...this.editorOptions, language: lang};
  }

  doCopy(): void {
  }

  doFullScreen(): void {
    this.isFull = !this.isFull;
  }

  generateDoc(): void {
    if (this.isEditingDoc) {
      this.isEditingDoc = false;
    }else {
      this.isEditingDoc = true;
    }
  }

  appendDoc() {
    try {
      const data = JSON.parse(this.code);
      this.treeDataEditorComponent.gen(data);
    } catch (e){
      console.error('parser error');
    }
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

  setText(content: any) {
    if (typeof content === 'string') {
      this.code = content;
      this.bodyContent.setContent(content);
    } else {
      this.code = JSON.stringify(content, null, '\t');
      this.bodyContent.setContent(JSON.stringify(content));
    }
  }

  setRespDoc(doc: DocJsonTableNode[]) {
    this.treeDataEditorComponent.setDocData(doc);
  }

  setLang(lang: string) {
    this.bodyType = lang;
    this.editorOptions = {...this.editorOptions, language: lang};
  }
}
