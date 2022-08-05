import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ColDef, GridApi, ValueGetterParams, ValueSetterParams} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';
import {CheckBoxCellEditorComponent} from '../inner/check-box-cell-editor/check-box-cell-editor.component';
import {CheckBoxCellComponent} from '../inner/check-box-cell/check-box-cell.component';
import {CloseInputCellComponent} from '../inner/close-input-cell/close-input-cell.component';
import {CellFileTextComponent} from '../inner/cell-file-text/cell-file-text.component';
import {CellFileComponent} from '../inner/cell-file/cell-file.component';
import {
  ApiFormKeyValue,
  ApiFormKeyValueChangeEvent,
  ApiKeyValue
} from '../../../../../../../core/services/entity/ApiPart';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
  @Output() dataChange = new EventEmitter<ApiFormKeyValueChangeEvent>();
  gridApi: GridApi;
  rowData: ApiFormKeyValue[] = [
    {using: true, key: '1', value: '2', desc: '3', type: 'text'},
    {using: true, key: '4', value: '5', desc: '6', type: 'text'},
    {using: true, key: '', value: '', desc: '', type: 'text'}
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
        changeType: (index, newType) => {
          this.rowData[index].type = newType;
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
        }else if (params.data.type === 'file'){
          if (params.data.type === 'file') {
            if (params.data.fileName) {
              v = params.data.fileName;
            } else {
              v = undefined;
            }
          }
        }else {
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
        setFileInfo: (index, fileName, fileId) => {
          console.log('form add file ', fileName, fileId);
          this.rowData[index].fileName = fileName;
          this.rowData[index].fileId = fileId;
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
        totalIndex: () => this.rowData.length,
        remove: (index) => {
          this.rowData.splice(index, 1);
          this.gridApi.setRowData(this.rowData);
          this.dataChange.next({field: 'form', data: this.rowData});
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

  public setData(data: ApiFormKeyValue[]): void {
    if (Array.isArray(data) && data.length === 0) {
      this.rowData = [new ApiFormKeyValue()];
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
    setTimeout(() => {
      const lastValue = this.rowData[this.rowData.length - 1];
      if (lastValue.key || lastValue.value || lastValue.desc) {
        this.rowData.push({key: '', value: '', desc: '', type: 'text', using: true});
        this.gridApi.setRowData(this.rowData);
      }
      this.dataChange.next({field: 'form', data: this.rowData});
      // this.gridApi.refreshCells({ force: true });
    }, 100);
  }
}
