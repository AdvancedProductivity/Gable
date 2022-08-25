import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular-legacy';
import {ICellRendererParams} from 'ag-grid-community';
import {Subscription} from 'rxjs';
import {CloseIconObservableService} from '../../../../../../../../core/services/close-icon-observable.service';

@Component({
  selector: 'app-close-input-cell',
  templateUrl: './close-input-cell.component.html',
  styleUrls: ['./close-input-cell.component.scss']
})
export class CloseInputCellComponent implements OnInit, ICellRendererAngularComp, OnDestroy {
  public cellValue: string;
  params: ICellRendererParams;
  isCursorIn = false;
  showHint = true;
  showingCloseIcon: Subscription;
  eventId: string;

  constructor(
    private closeIconObservableService: CloseIconObservableService
  ) {
  }

  ngOnDestroy(): void {
    console.log('destroy');
    if (this.showingCloseIcon) {
      this.showingCloseIcon.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.showingCloseIcon = this.closeIconObservableService.getShowingStatus().subscribe((r: { key: string; v: boolean }) => {
      if (r.key === this.eventId) {
        this.isCursorIn = r.v;
      }
    });
  }

  agInit(params: ICellRendererParams): void {
    // @ts-ignore
    this.eventId = params.field() + '_' + params.node.id;
    this.params = params;
    this.setValue(params);
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.params = params;
    this.setValue(params);
    return true;
  }

  delete() {
    // @ts-ignore
    this.params.remove(this.params.rowIndex, this.params.node.id);
  }

  private setValue(params: ICellRendererParams) {
    this.cellValue = params.value;
    if (this.cellValue) {
      this.showHint = false;
    }
  }
}
