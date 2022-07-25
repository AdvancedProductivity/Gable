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
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    console.log('zzq see params', params);
    this.cellValue = params.data.desc;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

}
