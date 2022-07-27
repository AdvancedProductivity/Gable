import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-cell-file-text',
  templateUrl: './cell-file-text.component.html',
  styleUrls: ['./cell-file-text.component.scss']
})
export class CellFileTextComponent implements OnInit {
  public cellValue: string;
  gridApi: any;
  params: ICellRendererParams;
  showHint = true;
  type = 'text';
  showSelect = false;
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

  onTypeChange(data: any) {
    console.log('zzq see change event', data);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.gridApi.refreshCells();
    this.setValue(params);
    return true;
  }

  private setValue(params: ICellRendererParams) {
    this.cellValue = params.value;
    if (this.cellValue) {
      this.showHint = false;
    }
    // @ts-ignore
    this.hintStr = params.hintStr;

  }


}
