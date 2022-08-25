import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BrowserOpenService} from '../../../core/services/browser-open.service';

@Component({
  selector: 'app-doc-detail',
  templateUrl: './doc-detail.component.html',
  styleUrls: ['./doc-detail.component.scss']
})
export class DocDetailComponent implements OnInit {
  docId: number;
  showing: number;
  isEdit = false;
  constructor(
    private route: ActivatedRoute,
    public browserOpenService: BrowserOpenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((res: ParamMap) => {
      this.docId = Number(res.get('docId'));
    });
  }
}
