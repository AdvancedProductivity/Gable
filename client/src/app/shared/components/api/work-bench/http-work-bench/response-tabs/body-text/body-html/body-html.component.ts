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
  }

  public setContent(c: string): void {
    this.content = c;
  }
}
