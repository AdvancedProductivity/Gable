import {Component, Inject, OnInit} from '@angular/core';
import {DocDashBoardComponent} from '../doc-dash-board.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-doc-create-dialog',
  templateUrl: './doc-create-dialog.component.html',
  styleUrls: ['./doc-create-dialog.component.scss']
})
export class DocCreateDialogComponent implements OnInit {
  newName = '';
  constructor(
    public dialogRef: MatDialogRef<DocDashBoardComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.newName = '';
  }

}
