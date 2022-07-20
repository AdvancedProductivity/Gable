import { Component, OnInit } from '@angular/core';
import {ColDef} from 'ag-grid-community';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.scss']
})
export class FormEditorComponent implements OnInit {
  rowData: any[] = [
    {key: 'name', value: 'a', desc: 'a name'},
    {key: 'param', value: 'a', desc: 'a name'}
  ];
  columnDefs: ColDef[] = [
    {field: 'key', resizable: true, editable: true},
    {field: 'value', resizable: true, editable: true},
    {field: 'desc', resizable: true, editable: true}
  ];
  frameworkComponents = {
  };
  defaultColDef = {
    editable: false,
    sortable: false,
    flex: 33,
    minWidth: 100,
    filter: false,
    resizable: false,
    headerComponentParams: {
      menuIcon: 'fa-bars',
    },
  };
  constructor() { }

  ngOnInit(): void {
  }

  onFirstGridReady(params: any, gridContainer: HTMLElement) {
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
