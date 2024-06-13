import {Component, OnInit} from '@angular/core';
import {MonacoStandaloneDiffEditor} from "@materia-ui/ngx-monaco-editor";

@Component({
  selector: 'app-diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.scss']
})
export class DiffComponent implements OnInit {
  lc = '';
  rc = '';

  editorOptions = {theme: 'vs-light', language: 'json'};
  code: string = '[1, 2, 3, 4]';
  originalCode: string = '[1, 2, 5, 4]';
  editor: any;
  constructor() { }

  ngOnInit(): void {
  }

  setLeft() {
    this.originalCode = JSON.stringify(JSON.parse(this.lc), null, 2);
    var model = this.editor.getModel();
    model.original.setValue(this.originalCode);
  }

  setRight() {
    this.code = JSON.stringify(JSON.parse(this.rc), null, 2);
    var model = this.editor.getModel();
    model.modified.setValue(this.code)
  }

  down(editor: MonacoStandaloneDiffEditor) {
    this.editor = editor;
  }
}
