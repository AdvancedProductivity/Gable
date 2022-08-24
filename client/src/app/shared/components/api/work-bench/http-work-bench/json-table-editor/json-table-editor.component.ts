import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent, RowNode,
  ValueSetterParams,
} from 'ag-grid-community';
import {DocJsonTableNode} from '../../../../../../core/services/entity/Docs';
import {
  OperationCellForJsonTableDocComponent
} from './operation-cell-for-json-table-doc/operation-cell-for-json-table-doc.component';
import {CellContentComponent} from '../request-tabs/inner/cell-content/cell-content.component';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-json-table-editor',
  templateUrl: './json-table-editor.component.html',
  styleUrls: ['./json-table-editor.component.scss']
})
export class JsonTableEditorComponent implements OnInit, OnChanges {
  @Output() chang = new EventEmitter<DocJsonTableNode[]>();
  @Input() da: DocJsonTableNode[];
  @Input() readonly = false;
  @Input() isScroll = true;
  treeSubject = new Subject<void>();
  gridApi = null;
  columnApi = null;
  columnDefs: ColDef[] = [
    // we're using the auto group column by default!
    {
      field: 'type',
      editable: (data) => !this.readonly,
      cellRenderer: CellContentComponent,
      cellEditor: 'select',
      minWidth: 80,
      cellEditorParams: {
        values: [
          'object',
          'array',
          'string',
          'number',
          'boolean'
        ]
      },
      cellRendererParams: {
        hintStr: 'Field Type'
      }
    },
    {
      field: 'sample',
      minWidth: 100,
      editable: () => !this.readonly,
      cellRenderer: CellContentComponent,
      cellRendererParams: {
        hintStr: 'Sample Value'
      }
    },
    {
      field: 'desc',
      minWidth: 100,
      editable: () => !this.readonly,
      cellRenderer: CellContentComponent,
      cellRendererParams: {
        hintStr: 'Description'
      }
    },
    {
      headerName: 'Operation',
      field: 'Operation',
      width: 110,
      minWidth: 110,
      maxWidth: 110,
      suppressMenu: true,
      editable: false,
      suppressSizeToFit: true,
      resizable: false,
      cellRenderer: OperationCellForJsonTableDocComponent,
      cellRendererParams: {
        dataUpdated: () => this.dataChange()
      },
    },
  ];
  defaultColDef: ColDef = {
    wrapText: true,
    autoHeight: true,
    flex: 1,
  };
  // @ts-ignore
  autoGroupColumnDef: ColDef = {
    headerName: 'Field Name',
    minWidth: 300,
    editable: (node) => !this.readonly && node.data.canEditName,
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
  groupDefaultExpanded = 2;

  constructor() {
  }

  @Input() get getData(): any {
    const arr = [];
    if (this.gridApi) {
      this.gridApi.forEachNode((rowNode, index) => {
        arr.push(rowNode.data);
      });
      return arr;
    }else {
      return this.rowData;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.da && changes.da.currentValue && Array.isArray(changes.da.currentValue)) {
      this.rowData = changes.da.currentValue;
    }
    if (changes.readonly) {
      this.readonly = changes.readonly.currentValue;
      this.readOnly();
    }
  }

  setDocData(bodyTextDoc: any) {
    if (Array.isArray(bodyTextDoc) && bodyTextDoc.length > 0) {
      this.rowData = bodyTextDoc;
      if (this.gridApi) {
        this.gridApi.setRowData(this.rowData);
      }
    }
  }

  getDataPath = (data: any) => data.location;

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.readOnly();
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
    this.treeSubject.pipe(debounceTime(2000))
      .subscribe(res => {
        const arr = [];
        this.gridApi.forEachNode((rowNode, index) => {
          arr.push(rowNode.data);
        });
        this.chang.next(arr);
      });
  }

  dataChange() {
    this.treeSubject.next();
  }

  gen(data: any): void {
    if (this.gridApi && this.rowData && Array.isArray(this.rowData) && this.rowData.length > 0) {
      const rootData = this.rowData[0];
      const rootNode = this.gridApi.getRowNode(rootData.id);
      const waitForAdd = [];
      this.traverse(data, this.process, rootNode.childrenAfterGroup, waitForAdd, rootNode.data.location);
      this.gridApi.applyTransaction({add: waitForAdd});
      this.dataChange();
    }
  }

  readOnly() {
    if (this.columnApi) {
      console.log('hhh', !this.readonly);
      this.columnApi.setColumnVisible('Operation', !this.readonly);
    }
  }

  onChanged(event: CellValueChangedEvent<any>) {
    this.dataChange();
  }

  getId = (da) => da.id;
  private process = (key: string, value: any, nodes: RowNode[], newArr: DocJsonTableNode[], ids: string[]): number => {
    let index = -1;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].data.name === key) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      const a = new DocJsonTableNode();
      if (Array.isArray(value)) {
        a.type = 'array';
      } else {
        a.type = typeof value;
        if (a.type !== 'object') {
          a.sample = value;
        }
      }
      a.name = key;
      a.location = [...ids, a.id];
      newArr.push(a);
    }
    return index;
  };

  private traverse(o: any, func, nodes: RowNode[], newArr: DocJsonTableNode[], ids: string[]) {
    const keySet = Object.keys(o);
    for (const i of keySet) {
      const index = func.apply(this, [i, o[i], nodes, newArr, ids]);
      if (o[i] !== null && Array.isArray(o[i]) && o[i].length > 0) {
        if (index === -1) {
          this.generateItem(o, i, nodes, func, newArr, newArr[newArr.length - 1].location);
        } else if (!nodes[index].childrenAfterGroup[0]) {
          this.generateItem(o, i, nodes, func, newArr, nodes[index].data.location);
        } else if (nodes[index].childrenAfterGroup[0].data.name !== 'item'
          && !nodes[index].childrenAfterGroup[0].data.canEditName) {
          this.generateItem(o, i, nodes, func, newArr, nodes[index].data.location);
        } else if (nodes[index].childrenAfterGroup[0].data.name === 'item'
          && !nodes[index].childrenAfterGroup[0].data.canEditName) {
          this.traverse(o[i][0], func, nodes[index].childrenAfterGroup[0].childrenAfterGroup,
            newArr, nodes[index].childrenAfterGroup[0].data.location);
        }
      } else if (o[i] !== null && typeof (o[i]) === 'object') {
        //going one step down in the object tree!!
        if (index === -1) {
          if (newArr[newArr.length - 1]) {
            this.traverse(o[i], func, [], newArr, newArr[newArr.length - 1].location);
          } else {
            this.traverse(o[i], func, [], newArr, ids);
          }
        } else {
          this.traverse(o[i], func, nodes[index].childrenAfterGroup, newArr, nodes[index].data.location);
        }
      }
    }
  }

  private generateItem(o: any, i: string, docs: RowNode[], func,
                       newArr: DocJsonTableNode[], ids: string[]) {
    if (typeof o[i][0] === 'object') {
      const a = new DocJsonTableNode();
      a.type = 'object';
      a.name = 'item';
      a.canEditName = false;
      a.location = [...ids, a.id];
      newArr.push(a);
      this.traverse(o[i][0], func, [], newArr, a.location);
    } else {
      const a = new DocJsonTableNode();
      a.type = typeof o[i][0];
      a.sample = o[i][0];
      a.name = 'item';
      a.canEditName = false;
      a.location = [...ids, a.id];
      newArr.push(a);
    }
  }
}
