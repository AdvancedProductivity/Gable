import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CellMouseOverEvent, ColDef, GridApi, ValueGetterParams, ValueSetterParams} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';
import {CloseInputCellComponent} from '../inner/close-input-cell/close-input-cell.component';
import {CellContentComponent} from '../inner/cell-content/cell-content.component';
import {CheckBoxCellComponent} from '../inner/check-box-cell/check-box-cell.component';
import {CheckBoxCellEditorComponent} from '../inner/check-box-cell-editor/check-box-cell-editor.component';
import {
  ApiKeyValue,
  ApiKeyValueChangeEvent,
  getCommonKeyValue
} from '../../../../../../../core/services/entity/ApiPart';
import {CloseIconObservableService} from '../../../../../../../core/services/close-icon-observable.service';

@Component({
  selector: 'app-query-table',
  templateUrl: './query-table.component.html',
  styleUrls: ['./query-table.component.scss']
})
export class QueryTableComponent implements OnInit {
  @Input() field: string;
  @Output() dataChange = new EventEmitter<ApiKeyValueChangeEvent>();
  gridApi: GridApi;
  rowData: ApiKeyValue[];
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
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.using !== params.newValue;
        if (valueChanged) {
          params.data.using = params.newValue;
          this.dataChange.next({field: this.field, data: this.rowData});
        }
        return valueChanged;
      }
    },
    {
      headerName: 'KEY',
      valueGetter: (params: ValueGetterParams) => params.data.key,
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
        hintStr: 'key',
        from: 'cc'
      },
      resizable: true,
      editable: true,
      cellStyle: {cursor: 'text'}
    },
    {
      headerName: 'VALUE',
      valueGetter: (params: ValueGetterParams) => params.data.value,
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
      valueGetter: (params: ValueGetterParams) => params.data.desc,
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
        field: () => this.field,
        remove: (index, rowId) => {
          let i = -1;
          this.gridApi.forEachNode((rowNode, iIndex) => {
            if (rowNode.id === rowId) {
              console.log('find', iIndex);
              i = iIndex;
            }
          });
          if (i === -1) {
            return;
          }
          const deleted = this.rowData.splice(i, 1);
          this.gridApi.applyTransaction({remove: deleted});
          this.dataChange.next({field: this.field, data: this.rowData});
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

  constructor(
    private closeIconObservableService: CloseIconObservableService
  ) {
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

  onCellMouseOver(params: CellMouseOverEvent<any>) {
    if (params.node.rowIndex + 1 === this.rowData.length) {
      return;
    }
    const colId = params.column.getColId();
    if (colId === '2') {
      const v = {
        key: this.field + '_' + params.node.id,
        v: true,
      };
      this.closeIconObservableService.emit(v);
    }
  }

  onCellMouseOut(params: CellMouseOverEvent<any>) {
    if (params.node.rowIndex + 1 === this.rowData.length) {
      return;
    }
    const colId = params.column.getColId();
    if (colId === '2') {
      const v = {
        key: this.field + '_' + params.node.id,
        v: false,
      };
      this.closeIconObservableService.emit(v);
    }
  }

  public setData(data: ApiKeyValue[]): void {
    if (Array.isArray(data) && data.length === 0) {
      this.rowData = [getCommonKeyValue()];
    } else {
      this.rowData = data;
    }
  }

  public getData(): any[] {
    return this.rowData;
  }

  private handleAddRow() {
    const lastValue = this.rowData[this.rowData.length - 1];
    if (lastValue.key || lastValue.value || lastValue.desc) {
      const newRow = getCommonKeyValue();
      this.rowData.push(newRow);
      this.gridApi.applyTransaction({add: [newRow]});
    }
    this.dataChange.next({field: this.field, data: this.rowData});
  }
}
