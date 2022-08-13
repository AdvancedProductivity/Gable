import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-dash-board',
  templateUrl: './doc-dash-board.component.html',
  styleUrls: ['./doc-dash-board.component.scss']
})
export class DocDashBoardComponent implements OnInit {
  docs = [];
  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
      this.docs.push(i);
    }
  }

}
