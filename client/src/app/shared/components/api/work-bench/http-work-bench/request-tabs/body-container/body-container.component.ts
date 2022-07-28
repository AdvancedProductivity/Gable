import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.scss']
})
export class BodyContainerComponent implements OnInit {
  curTyp = 'none';
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
    console.log('zzq see change', data);
  }
}
