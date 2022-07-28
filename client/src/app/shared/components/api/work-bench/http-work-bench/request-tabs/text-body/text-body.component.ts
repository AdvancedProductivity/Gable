import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit {
  editorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  code = '{}';

  constructor() { }

  ngOnInit(): void {
  }

  setBodyLang(language): void {
    this.editorOptions = {...this.editorOptions, language};
  }
}
