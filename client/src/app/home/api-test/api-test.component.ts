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
    this.defaultRightSize = 32;
    this.spinner.show();
  }

  onMenuReady(data: any) {
    this.spinner.hide();
  }

  onRightDragEnd(data: IOutputData): void {
    this.defaultRightSize = data.sizes[1];
  }

  doExpandPanel(): void {
    this.defaultRightSize = 240;
  }

  doClosePanel(): void {
    this.defaultRightSize = 32;
  }
}
