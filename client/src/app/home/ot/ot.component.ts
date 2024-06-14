import { Component, OnInit } from '@angular/core';
import {jot} from './ot';
import {MonacoStandaloneDiffEditor} from '@materia-ui/ngx-monaco-editor';
@Component({
  selector: 'app-ot',
  templateUrl: './ot.component.html',
  styleUrls: ['./ot.component.scss']
})
export class OtComponent implements OnInit {
  sn = {a: {a: 'aina', b: 'binb'}};
  snapshot = JSON.stringify(this.sn, null, 2);
  op = JSON.stringify([{
    p: ['a', 'b'],
    od: 'binb',
    oi: 'c'
  }], null, 2);

  editorOptions = {theme: 'vs-light', language: 'json'};
  code: string = JSON.stringify(this.sn, null, 2);
  originalCode: string = JSON.stringify(this.sn, null, 2);
  editor: any;
  constructor() { }

  ngOnInit(): void {
  }

  setSnapshot() {
    this.originalCode = JSON.stringify(JSON.parse(this.snapshot), null, 2);
    const model = this.editor.getModel();
    model.original.setValue(this.originalCode);
  }

  setOp() {
    console.log('see op is', this.op);
    const op = JSON.parse(this.op);
    const snapshot = JSON.parse(this.snapshot);
    const a = jot.apply(snapshot, op);
    console.log('zzq see a', a);
    this.code = JSON.stringify(snapshot, null, 2);
    const model = this.editor.getModel();
    model.modified.setValue(this.code);
  }

  down(editor: MonacoStandaloneDiffEditor) {
    this.editor = editor;
  }
}
