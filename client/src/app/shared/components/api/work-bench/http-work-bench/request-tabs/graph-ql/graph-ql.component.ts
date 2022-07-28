import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-ql',
  templateUrl: './graph-ql.component.html',
  styleUrls: ['./graph-ql.component.scss']
})
export class GraphQLComponent implements OnInit {
  queryEditorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'text'
  };
  query = '';
  dataEditorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json'
  };
  data = '';
  constructor() { }

  ngOnInit(): void {
  }

}
