import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-table-editor',
  templateUrl: './json-table-editor.component.html',
  styleUrls: ['./json-table-editor.component.scss']
})
export class JsonTableEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  gen(data: any): void {
    console.log('do append', data);
  }
  readOnly() {
  }

}
