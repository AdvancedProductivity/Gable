import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-cell-content',
  templateUrl: './cell-content.component.html',
  styleUrls: ['./cell-content.component.scss']
})
export class CellContentComponent implements OnInit, ICellRendererAngularComp {
  public cellValue: string;
  gridApi: any;
  params: ICellRendererParams;
  showHint = true;
  hintStr = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.gridApi= params.api;
    this.setValue(params);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.gridApi.refreshCells();
    this.setValue(params);
    return true;
  }

  private setValue(params: ICellRendererParams) {
    console.log('this.params: ', params);
    this.cellValue = params.value;
    if (this.cellValue) {
      this.showHint = false;
    }
    // @ts-ignore
    this.hintStr = params.hintStr;

  }
}
