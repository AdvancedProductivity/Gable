import { Component, OnInit } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {HttpApiStorageService} from '../../../../../../../../core/services/storage/http-api-storage.service';
import {FileUploadInfo} from '../../../../../../../../core/services/entity/ApiPart';

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

  constructor(
    private httpApiStorageService: HttpApiStorageService
  ) {
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
    if (info === undefined) {
      return;
    }
    const file = info.target.files[0];
    // console.log('zzq see file select', JSON.stringify({cellValue: this.cellValue}), file);
    this.cellValue = file.name;
    this.showHint = false;
    this.httpApiStorageService.setFile(file).then((res: FileUploadInfo) => {
      console.log('rec', res);
      // @ts-ignore
      this.params.setFileInfo(this.params.rowIndex, res.name, new Date().getTime(), res.url, res.path);
    });
  }

  private setValue(params: ICellRendererParams) {
    // console.log('zzq see setValue', JSON.stringify({cellValue: params.value}));
    this.cellValue = params.value;
    this.showHint = !this.cellValue;
    // console.log('zzq see params set hint=' + this.showHint, this.cellValue);
    // @ts-ignore
    this.hintStr = params.hintStr;
    // @ts-ignore
    this.isText = params.getTextType(params.rowIndex) !== 'file';
  }
}
