import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {GridApi} from 'ag-grid-community/dist/lib/gridApi';

@Component({
  selector: 'app-cell-file-text',
  templateUrl: './cell-file-text.component.html',
  styleUrls: ['./cell-file-text.component.scss']
})
export class CellFileTextComponent implements OnInit {
  public cellValue: string;
  gridApi: GridApi<any>;
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
    this.type = params.data.type;
    this.gridApi = params.api;
    this.setValue(params);
  }

  onTypeChange(data: any) {
    // @ts-ignore
    this.params.changeType(this.params.rowIndex, data, this.params.node.id);
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
