import { Component, OnInit } from '@angular/core';
import {ColDef, GridApi, ValueGetterParams, ValueSetterParams} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';
import {CloseInputCellComponent} from '../inner/close-input-cell/close-input-cell.component';
import {CellContentComponent} from '../inner/cell-content/cell-content.component';
import {CheckBoxCellComponent} from '../inner/check-box-cell/check-box-cell.component';
import {CheckBoxCellEditorComponent} from '../inner/check-box-cell-editor/check-box-cell-editor.component';

@Component({
  selector: 'app-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.scss']
})
export class QueryTableComponent implements OnInit {
  gridApi: GridApi;
  rowData: any[] = [
    {using: true, key: '1', value: '2', desc: '3'},
    {using: true, key: '4', value: '5', desc: '6'},
    {using: true, key: '', value: '', desc: ''}
  ];
  columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'using',
      suppressSizeToFit: true,
      resizable: false,
      cellEditor: CheckBoxCellEditorComponent,
      editable: true,
      width: 60,
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: CheckBoxCellComponent,
    },
    {
      headerName: 'KEY',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.key) {
          return params.data.key;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.key !== params.newValue;
        if (valueChanged) {
          params.data.key = params.newValue;
        }
        this.handleAddRow();
        return valueChanged;
      },
      cellRenderer: CellContentComponent,
      cellRendererParams: {
        hintStr: 'key'
      },
      resizable: true,
      editable: true,
      cellStyle: {cursor: 'text'}
    },
    {
      headerName: 'VALUE',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.value) {
          return params.data.value;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.value !== params.newValue;
        if (valueChanged) {
          params.data.value = params.newValue;
        }
        this.handleAddRow();
        return valueChanged;
      },
      cellRenderer: CellContentComponent,
      cellRendererParams: {
        hintStr: 'value'
      },
      resizable: true,
      editable: true,
      cellStyle: {cursor: 'text'}
    },
    {
      headerName: 'DESCRIPTION',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.desc) {
          return params.data.desc;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.desc !== params.newValue;
        if (valueChanged) {
          params.data.desc = params.newValue;
        }
        this.handleAddRow();
        return valueChanged;
      },
      resizable: true,
      editable: true,
      cellRenderer: CloseInputCellComponent,
      cellRendererParams: {
        totalIndex: () => this.rowData.length,
        remove: (index) => {
          this.rowData.splice(index, 1);
          this.gridApi.setRowData(this.rowData);
        }
      },
      cellStyle: {cursor: 'text'}
    }
  ];
  frameworkComponents = {};
  defaultColDef = {
    editable: false,
    sortable: false,
    flex: 33,
    minWidth: 100,
    filter: false,
    resizable: false,
    singleClickEdit: true,
    headerComponentParams: {
      menuIcon: 'fa-bars',
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onFirstGridReady(params: any, gridContainer: HTMLElement) {
    this.gridApi = params.api;
    const array = ['.ag-body-viewport', ' .ag-body-horizontal-scroll-viewport'];
    array.forEach(element => {
      const container = gridContainer.querySelector(element);
      if (container) {
        const ps = new PerfectScrollbar(container);
        ps.update();
      }
    });
  }

  public getData(): any[] {
    return this.rowData;
  }

  private handleAddRow() {
    setTimeout(() => {
      const lastValue = this.rowData[this.rowData.length - 1];
      if (lastValue.key || lastValue.value || lastValue.desc) {
        this.rowData.push({key: '', value: '', desc: ''});
        this.gridApi.setRowData(this.rowData);
      }
     // this.gridApi.refreshCells({ force: true });
    }, 100);
  }
}
