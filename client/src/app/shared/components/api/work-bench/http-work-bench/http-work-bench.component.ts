import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RequestTabsComponent} from './request-tabs/request-tabs.component';

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit {
  @ViewChild(RequestTabsComponent)
  req!: RequestTabsComponent;
  @Output() run = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  doSomething(): void {
    this.run.next({});
  }

  methodChange(data: any): void {
  }

  onSend() {
    const data: any = {};
    data.req = this.req.getData();
    console.log('zzq see data wait for send', data);
    // @ts-ignore
    gtag('event', 'run_test', {
      type: 'Http',
    });
  }
}
