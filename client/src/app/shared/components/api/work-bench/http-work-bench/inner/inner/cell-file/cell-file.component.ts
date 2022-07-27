import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';

@Component({
  selector: 'app-cell-file',
  templateUrl: './cell-file.component.html',
  styleUrls: ['./cell-file.component.scss']
})
export class CellFileComponent implements OnInit, ICellRendererAngularComp {
  public cellValue: string;
  gridApi: any;
  params: ICellRendererParams;
  showHint = true;
  hintStr = '';
  isText = true;

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

  fileChange(info: any): void {
    const file = info.target.files[0];
    console.log('zzq see file select', file);
    // @ts-ignore
    this.params.setFileInfo(this.params.rowIndex, file.name, file.lastModified);
  }

  private setValue(params: ICellRendererParams) {
    console.log('zzq see params set', params);
    this.cellValue = params.value;
    if (this.cellValue) {
      this.showHint = false;
    }
    // @ts-ignore
    this.hintStr = params.hintStr;
    // @ts-ignore
    this.isText = params.getTextType(params.rowIndex) !== 'file';
  }
}
