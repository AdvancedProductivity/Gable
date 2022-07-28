import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-html',
  templateUrl: './body-html.component.html',
  styleUrls: ['./body-html.component.scss']
})
export class BodyHtmlComponent implements OnInit {
  content = '';

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 1000; i++) {
      this.content += `<h1>Hello World  ${i}</h1>`;
    }
  }

}
