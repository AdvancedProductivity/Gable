import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {ICellRendererParams, RowNode} from 'ag-grid-community';
import {DocJsonTableNode} from '../../../../../../../core/services/entity/Docs';

@Component({
  selector: 'app-operation-cell-for-json-table-doc',
  template: `
    <div class="json-doc-cell-container" id="zadsad">
      <span *ngIf="isShowDelete" (click)="deleteNode($event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 red-svg" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
      <span *ngIf="isShowAdd" (click)="addNode($event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 blue-svg" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </span>
    </div>
  `,
  styles: [`
  .json-doc-cell-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

    svg {
      fill: none;
      cursor: pointer;
      margin-top: 12px;
      width: 20px;
      height: 20px;
    }

    .red-svg {
      color: red;
    }

    .blue-svg {
      color: #2395f1;;
    }
  }
  `]
})
export class OperationCellForJsonTableDocComponent implements OnInit, ICellRendererAngularComp {
  private curData: DocJsonTableNode;
  private gridApi = null;
  private rowId;
  isShowAdd = true;
  isShowDelete = true;
  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: ICellRendererParams): void {
    console.log('zzq see cell', params);
    this.curData = params.data;
    this.isShowAdd = (this.curData.type === 'object' || this.curData.type === 'array');
    this.isShowDelete = this.curData.canDelete;
    this.gridApi = params.api;
    this.rowId = params.node.id;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }

  delete() {
    console.log('delete');
  }

  deleteNode($event: MouseEvent) {
    $event.cancelBubble = true;
    const selectedNode = this.gridApi.getRowNode(this.rowId);
    if (!selectedNode) {
      console.warn('No nodes selected!');
      return;
    }
    this.gridApi.applyTransaction({ remove: this.getRowsToRemove(selectedNode) });
  }

  addNode($event: MouseEvent) {
    $event.cancelBubble = true;
    console.log('addNode');
    const docJsonTableNode = new DocJsonTableNode();
    docJsonTableNode.name = 'Field Name';
    docJsonTableNode.desc = '';
    docJsonTableNode.sample = '';
    docJsonTableNode.type = 'string';
    docJsonTableNode.canEditName = true;
    docJsonTableNode.canDelete = true;
    docJsonTableNode.location = [...this.curData.location, docJsonTableNode.id];
    this.gridApi.applyTransaction({add: [docJsonTableNode] });
  }

  private getRowsToRemove(node: RowNode) {
    let res: any[] = [];
    const children = node.childrenAfterGroup || [];
    console.log('zzq see children', children);
    let i = 0;
    while (i < children.length) {
      res = res.concat(this.getRowsToRemove(children[i]));
      i++;
    }
    // ignore nodes that have no data, i.e. 'filler groups'
    return node.data ? res.concat([node.data]) : res;
  }
}
