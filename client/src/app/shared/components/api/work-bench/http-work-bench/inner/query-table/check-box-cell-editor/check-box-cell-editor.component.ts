import {AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ICellEditorAngularComp} from 'ag-grid-angular-legacy';
import {ICellEditorParams} from 'ag-grid-community';

@Component({
  selector: 'app-check-box-cell-editor',
  templateUrl: './check-box-cell-editor.component.html',
  styleUrls: ['./check-box-cell-editor.component.scss']
})
export class CheckBoxCellEditorComponent implements OnInit, ICellEditorAngularComp, AfterViewInit {

  @ViewChild('container', {read: ViewContainerRef})
  public container!: ViewContainerRef;

  params: any;
  vvvv: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: ICellEditorParams): void {
    console.log('zzq see edit value', params);
    this.params = params;
    this.vvvv = params.value;
  }

  getValue(): any {
    return this.vvvv;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.container.element.nativeElement.focus();
    }, 10);
  }

  onKeyDown(event: any): void {
    const key = event.key;
    if (key === 'Enter') {
      this.vvvv = !this.vvvv;
    }
    console.log('zzq see key', key, key === 'Enter');
  }

}
