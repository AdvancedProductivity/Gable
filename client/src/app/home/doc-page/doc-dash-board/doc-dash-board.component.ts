import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DocCreateDialogComponent} from './doc-create-dialog/doc-create-dialog.component';
import {DocService} from '../../../core/services/impl/doc.service';
import {Doc} from '../../../core/services/entity/Docs';
import {AnalysisService} from "../../../core/services/analysis.service";

@Component({
  selector: 'app-doc-dash-board',
  templateUrl: './doc-dash-board.component.html',
  styleUrls: ['./doc-dash-board.component.scss']
})
export class DocDashBoardComponent implements OnInit {
  docs: Doc[];

  constructor(
    private docService: DocService,
    private analysisService: AnalysisService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  addDoc(): void {
    const dialogRef = this.dialog.open(DocCreateDialogComponent, {
      width: '450px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.analysisService.addDoc().then(r => {});
        this.docService.addDoc(result).then(newId => {
          this.getData();
        });
      }
    });
  }

  private getData() {
    this.docService.getAllDocs().then(res => {
      this.docs = res;
    });
  }
}
