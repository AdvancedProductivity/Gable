import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  onBodyTypeChange($event: any): void {
  }
}
