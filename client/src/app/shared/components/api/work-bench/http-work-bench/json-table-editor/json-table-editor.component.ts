import { Component, OnInit } from '@angular/core';
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';

@Component({
  selector: 'app-json-table-editor',
  templateUrl: './json-table-editor.component.html',
  styleUrls: ['./json-table-editor.component.scss']
})
export class JsonTableEditorComponent implements OnInit {
  gridApi = null;
  columnDefs: ColDef[] = [
    // we're using the auto group column by default!
    { field: 'jobTitle', editable: true },
    { field: 'employmentType', editable: true },
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
    valueGetter: (da) => da.data.jobTitle
  };
  rowData: any[] | null = this.getData();
  groupDefaultExpanded = -1;

  constructor() { }

  getDataPath = (data: any) => data.orgHierarchy;

  onFilterTextBoxChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById('filter-text-box') as any).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnInit(): void {
  }
  gen(data: any): void {
    console.log('do append', data);
    console.log('zq see daa', this.gridApi.getModel().gridOptionsWrapper.gridOptions.rowData);
  }
  readOnly() {
  }

  private getData(): any[] {
    const rowData = [
      {
        orgHierarchy: ['Erica Rogers'],
        jobTitle: 'CEO',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett'],
        jobTitle: 'Exec. Vice President',
        employmentType: 'Permanent',
      },

      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Esther Baker'],
        jobTitle: 'Director of Operations',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
        ],
        jobTitle: 'Fleet Coordinator',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
          'Leah Flowers',
        ],
        jobTitle: 'Parts Technician',
        employmentType: 'Contract',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Brittany Hanson',
          'Tammy Sutton',
        ],
        jobTitle: 'Service Technician',
        employmentType: 'Contract',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Esther Baker',
          'Derek Paul',
        ],
        jobTitle: 'Inventory Control',
        employmentType: 'Permanent',
      },

      {
        orgHierarchy: ['Erica Rogers', 'Malcolm Barrett', 'Francis Strickland'],
        jobTitle: 'VP Sales',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Morris Hanson',
        ],
        jobTitle: 'Sales Manager',
        employmentType: 'Permanent',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Todd Tyler',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Bennie Wise',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Contract',
      },
      {
        orgHierarchy: [
          'Erica Rogers',
          'Malcolm Barrett',
          'Francis Strickland',
          'Joel Cooper',
        ],
        jobTitle: 'Sales Executive',
        employmentType: 'Permanent',
      },
    ];
    return rowData;
  }
}
