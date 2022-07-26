import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-check-box-cell',
  templateUrl: './check-box-cell.component.html',
  styleUrls: ['./check-box-cell.component.scss']
})
export class CheckBoxCellComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  checkedHandler(event) {
    const checked = event.target.checked;
    const colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

}
