import {Component, OnInit, ViewChild} from '@angular/core';
import {QueryTableComponent} from '../query-table/query-table.component';

@Component({
  selector: 'app-request-tabs',
  templateUrl: './request-tabs.component.html',
  styleUrls: ['./request-tabs.component.scss']
})
export class RequestTabsComponent implements OnInit {
  @ViewChild(QueryTableComponent)
  query!: QueryTableComponent;
  tabs = ['Params', 'Authorization', 'Header', 'Body', 'Pre-Script', 'Post-Script'];
  curTab = 'Params';
  constructor() { }

  ngOnInit(): void {
  }

  public getData(): any {
    const data: any = {};
    data.query = this.query.getData();
    return data;
  }

}
