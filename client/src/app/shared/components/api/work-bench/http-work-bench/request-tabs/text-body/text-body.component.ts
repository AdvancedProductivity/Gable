import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-body',
  templateUrl: './text-body.component.html',
  styleUrls: ['./text-body.component.scss']
})
export class TextBodyComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'json'};
  code = '{}';

  constructor() { }

  ngOnInit(): void {
  }

}
