import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss']
})
export class TestDashboardComponent implements OnInit {
  defaultRightSize = 32;
  data: any;
  constructor() { }

  ngOnInit(): void {
    this.defaultRightSize = 32;
  }

  onRightDragEnd(data: any): void {
    this.defaultRightSize = data.sizes[1];
  }

  doExpandPanel(): void {
    this.defaultRightSize = 240;
  }

  doClosePanel(): void {
    this.defaultRightSize = 32;
  }

  run(): void {
  }

  setData(data: any) {
    this.data = data;
  }
}
