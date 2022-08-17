import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {BodyHtmlComponent} from './body-html/body-html.component';
import {TreeDataEditorComponent} from '../../tree-data-editor/tree-data-editor.component';
import {DocJsonNode} from '../../../../../../../core/services/entity/Docs';

@Component({
  selector: 'app-body-text',
  templateUrl: './body-text.component.html',
  styleUrls: ['./body-text.component.scss']
})
export class BodyTextComponent implements OnInit {
  @ViewChild('htmlContent', {static: true}) bodyContent: BodyHtmlComponent;
  @ViewChild('dataEditorComponent', {static: false}) treeDataEditorComponent: TreeDataEditorComponent;
  @Output() respDocChange = new EventEmitter<DocJsonNode>();
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

  onRespDocChange(newDoc: DocJsonNode) {
    this.respDocChange.next(newDoc);
  }

  onBodyTypeChange($event: any): void {
    if (this.isEditingDoc) {
      this.isEditingDoc = false;
    }
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

  setRespDoc(doc: DocJsonNode) {
    this.treeDataEditorComponent.setDocData(doc);
  }
}
