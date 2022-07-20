import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit {
  @Output() run = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  doSomething(): void {
    this.run.next({});
  }

  methodChange(data: any): void {
  }
}
