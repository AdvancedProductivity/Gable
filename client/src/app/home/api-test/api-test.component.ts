import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {IOutputData} from 'angular-split';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {
  defaultRightSize: number | '*';
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.defaultRightSize = 60;
    this.spinner.show();
  }

  onMenuReady(data: any) {
    this.spinner.hide();
  }

  onRightDragEnd($event: IOutputData): void {
    this.defaultRightSize = $event.sizes[1];
  }
}
