import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CellMouseOverEvent, ColDef, GridApi, ValueGetterParams, ValueSetterParams} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';
import {CheckBoxCellEditorComponent} from '../inner/check-box-cell-editor/check-box-cell-editor.component';
import {CheckBoxCellComponent} from '../inner/check-box-cell/check-box-cell.component';
import {CloseInputCellComponent} from '../inner/close-input-cell/close-input-cell.component';
import {CellFileTextComponent} from '../inner/cell-file-text/cell-file-text.component';
import {CellFileComponent} from '../inner/cell-file/cell-file.component';
import {
  ApiFormKeyValue,
  ApiFormKeyValueChangeEvent, getCommonFormKeyValue
} from '../../../../../../../core/services/entity/ApiPart';
import {randomString} from '../../../../../../../core/services/utils/Uuid';
import {CloseIconObservableService} from '../../../../../../../core/services/close-icon-observable.service';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit, OnDestroy {
  @Input() field: string;
  @Output() dataChange = new EventEmitter<ApiFormKeyValueChangeEvent>();
  gridApi: GridApi;
  rowData: ApiFormKeyValue[] = [];
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
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.using !== params.newValue;
        if (valueChanged) {
          params.data.using = params.newValue;
          this.dataChange.next({field: 'form', data: this.rowData});
        }
        return valueChanged;
      },
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
      cellRenderer: CellFileTextComponent,
      cellRendererParams: {
        hintStr: 'key',
        changeType: (index, newType, rowId) => {
          const rowNode = this.gridApi.getRowNode(rowId);
          this.rowData[index].type = newType;
          this.gridApi.refreshCells({
            force: true,
            rowNodes: [rowNode],
            columns: ['1']
          });
          this.dataChange.next({field: this.field, data: this.rowData});
        }
      },
      resizable: true,
      editable: true,
      cellStyle: {cursor: 'text'}
    },
    {
      headerName: 'VALUE',
      valueGetter: (params: ValueGetterParams) => {
        let v;
        if (params.data.type === 'text') {
          if (params.data.value) {
            v = params.data.value;
          } else {
            v = undefined;
          }
        } else if (params.data.type === 'file') {
          if (params.data.type === 'file') {
            if (params.data.fileName) {
              v = params.data.fileName;
            } else {
              v = undefined;
            }
          }
        } else {
          v = undefined;
        }
        return v;
      },
      valueSetter: (params: ValueSetterParams) => {
        const valueChanged = params.data.value !== params.newValue;
        if (valueChanged) {
          params.data.value = params.newValue;
        }
        this.handleAddRow();
        return valueChanged;
      },
      cellRenderer: CellFileComponent,
      cellRendererParams: {
        hintStr: 'value',
        getTextType: (index) => this.rowData[index].type,
        setFileInfo: (index, fileName, fileId, fileUrl, filePath) => {
          this.rowData[index].fileUrl = fileUrl;
          this.rowData[index].filePath = filePath;
          this.rowData[index].fileName = fileName;
          this.rowData[index].fileId = fileId;
          this.dataChange.next({field: this.field, data: this.rowData});
        }
      },
      resizable: true,
      editable: (params) => params.data.type !== 'file',
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

  ngOnDestroy(): void {
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

  getId = (da) => randomString(6);

  public setData(data: ApiFormKeyValue[]): void {
    if (Array.isArray(data) && data.length === 0) {
      this.rowData = [getCommonFormKeyValue()];
    } else {
      this.rowData = data;
    }
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
    const lastValue = this.rowData[this.rowData.length - 1];
    if (lastValue.key || lastValue.value || lastValue.desc) {
      this.rowData.push(getCommonFormKeyValue());
      this.gridApi.setRowData(this.rowData);
    }
    this.dataChange.next({field: this.field, data: this.rowData});
  }
}
