import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  ValueSetterParams,
} from 'ag-grid-community';
import {DocJsonTableNode} from '../../../../../../core/services/entity/Docs';
import {
  OperationCellForJsonTableDocComponent
} from './operation-cell-for-json-table-doc/operation-cell-for-json-table-doc.component';
import {randomString} from "../../../../../../core/services/utils/Uuid";

@Component({
  selector: 'app-json-table-editor',
  templateUrl: './json-table-editor.component.html',
  styleUrls: ['./json-table-editor.component.scss']
})
export class JsonTableEditorComponent implements OnInit {
  gridApi = null;
  columnDefs: ColDef[] = [
    // we're using the auto group column by default!
    {field: 'desc', editable: true},
    {field: 'sample', editable: true},
    {
      headerName: 'Operation',
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      suppressMenu: true,
      editable: false,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: OperationCellForJsonTableDocComponent
    },
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };
  // @ts-ignore
  autoGroupColumnDef: ColDef = {
    headerName: 'Organisation Hierarchy',
    minWidth: 300,
    editable: true,
    cellRendererParams: {
      suppressCount: true,
    },
    valueGetter: (da) => da.data.name,
    valueSetter: (params: ValueSetterParams) => {
      const valueChanged = params.data.name !== params.newValue;
      if (valueChanged) {
        params.data.name = params.newValue;
      }
      return valueChanged;
    }
  };
  rowData: DocJsonTableNode[];
  groupDefaultExpanded = -1;

  constructor() { }

  getDataPath = (data: any) => data.location;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
    if (!this.rowData) {
      this.rowData = [];
      const docJsonTableNode = new DocJsonTableNode();
      docJsonTableNode.name = 'root';
      docJsonTableNode.desc = 'desc';
      docJsonTableNode.sample = 'sample';
      docJsonTableNode.type = 'object';
      docJsonTableNode.canEditName = false;
      docJsonTableNode.canDelete = false;
      docJsonTableNode.location = [docJsonTableNode.id];
      this.rowData.push(docJsonTableNode);
    }
  }
  gen(data: any): void {
    console.log('do append', data);
    console.log('zq see daa', this.gridApi.getModel().gridOptionsWrapper.gridOptions.rowData);
  }
  readOnly() {
  }

  getId = (da) => da.id;
}
