import {Component, OnInit, ViewChild} from '@angular/core';
import {TextBodyComponent} from "../text-body/text-body.component";

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent implements OnInit {
  @ViewChild(TextBodyComponent)
  editorBody!: TextBodyComponent;
  curTyp = 'none';
  rawType = 'json';
  types = [
    {name: 'none', type: 'none'}
    , {name: 'form-data', type: 'form_data'}
    , {name: 'x-www-form-urlencoded', type: 'urlencoded'}
    , {name: 'raw', type: 'raw'}
    , {name: 'GraphQL', type: 'graphQL'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onTypeChange(data: any): void {
  }

  onBodyChange(data: any): void {
    this.editorBody.setBodyLang(data);
  }

  onBeautify(): void {
  }
}
