import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-close-input-cell',
  templateUrl: './close-input-cell.component.html',
  styleUrls: ['./close-input-cell.component.scss']
})
export class CloseInputCellComponent implements OnInit,ICellRendererAngularComp {
  public cellValue: string;
  params: ICellRendererParams;
  isCursorIn = false;
  isShowClose = true;
  showHint = true;
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.setValue(params);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.setValue(params);
    return true;
  }

  delete(){
    // @ts-ignore
    this.params.remove(this.params.rowIndex, this.params.node.id);
  }

  private setValue(params: ICellRendererParams) {
    this.cellValue = params.value;
    if (this.cellValue) {
      this.showHint = false;
    }
    // @ts-ignore
    console.log('compare ', params.totalIndex(), params.rowIndex + 1);
    // @ts-ignore
    this.isShowClose = params.totalIndex() !== params.rowIndex + 1;
  }
}
