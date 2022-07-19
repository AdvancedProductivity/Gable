import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-api-header-operation',
  templateUrl: './api-header-operation.component.html',
  styleUrls: ['./api-header-operation.component.scss']
})
export class ApiHeaderOperationComponent implements OnInit {
  @ViewChild('apiNameInput', {static: false})
  input: HTMLElement;

  showIcon = false;
  showEdit = false;
  apiName = '查询列表';

  constructor() {
  }

  ngOnInit(): void {
  }

  selectChange(data: any): void {
    if (data === undefined) {
      return;
    }
  }

  editName(): void {
    this.showEdit = true;
    setTimeout(() => {
      const input = document.getElementById('apiNameInput');
      input.focus();
    }, 5);
  }

  updateName(): void {
    this.showIcon = false;
  }

  saveApiName() {
    if (this.showEdit) {
      this.showEdit = false;
      return;
    }
  }

  copyLink(): void {
  }
}
