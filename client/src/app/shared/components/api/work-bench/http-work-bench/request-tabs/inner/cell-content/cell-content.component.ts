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
    this.cellValue = params.value;
    if (this.cellValue === undefined) {
      this.showHint = true;
    } else if ((typeof this.cellValue === 'string')) {
      if (this.cellValue) {
        this.showHint = false;
      }else {
        this.showHint = true;
      }
    } else {
      this.showHint = false;
    }
    // @ts-ignore
    this.hintStr = params.hintStr;

  }
}
