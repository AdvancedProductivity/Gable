import { Component, OnInit } from '@angular/core';
import {ColDef, GridApi, ValueGetterParams, ValueSetterParams} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';
import {CloseInputCellComponent} from './close-input-cell/close-input-cell.component';

@Component({
  selector: 'app-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.scss']
})
export class QueryTableComponent implements OnInit {
  gridApi: GridApi;
  rowData: any[] = [
    {key: 'name', value: 'a', desc: 'a name'},
    {key: 'param', value: 'a', desc: 'a name'},
    {key: '', value: '', desc: ''}
  ];
  columnDefs: ColDef[] = [
    {field: 'key', resizable: true, editable: true, cellStyle: {cursor: 'text'}},
    {
      headerName: 'value',
      tooltipField: 'value',
      tooltipValueGetter: (params) => 'Address: ' + params.value,
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.value) {
          return params.data.value;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        console.log('zzq see params valueSetter ', params);
        const valueChanged = params.data.value !== params.newValue;

        const lastValue = this.rowData[this.rowData.length - 1];
        if (!lastValue.key || !lastValue.value) {
          this.gridApi.applyTransaction({add: [{}]});
        }
        if (valueChanged && !params.newValue && !params.node.data.key && !params.node.data.desc) {
          console.log('zzq see remove node', params.node.data);
          setTimeout(() => {
            this.gridApi.applyTransaction({remove: [this.rowData[params.node.rowIndex]]});
          }, 300);
        }else if (valueChanged) {
          params.data.value = params.newValue;
        }
        return valueChanged;
      }, resizable: true, editable: true
    },
    {field: 'desc', resizable: true, editable: true, cellRenderer: CloseInputCellComponent}
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
}
