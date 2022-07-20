import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit {
  tabs = ['Params', 'Authorization', 'Header', 'Body', 'Pre-Script', 'Post-Script'];
  curTab = 'Params';
  constructor() { }

  ngOnInit(): void {
  }

}
