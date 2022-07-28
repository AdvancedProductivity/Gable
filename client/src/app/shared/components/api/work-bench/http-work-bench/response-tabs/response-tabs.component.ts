import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-response-tabs',
  templateUrl: './response-tabs.component.html',
  styleUrls: ['./response-tabs.component.scss']
})
export class ResponseTabsComponent implements OnInit {
  tabs = ['Body', 'Cookies', 'Headers', 'Post-Script'];
  curTab = 'Body';
  constructor() { }

  ngOnInit(): void {
  }

}
