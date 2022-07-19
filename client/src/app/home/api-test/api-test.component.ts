import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavComponent} from '../../shared/components/api/nav/nav.component';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {
  @ViewChild('apiNav', {static: false}) nav: NavComponent;
  defaultRightSize = 32;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.defaultRightSize = 32;
    this.spinner.show();
  }

  onMenuReady(data: any) {
    this.spinner.hide();
  }

  onRightDragEnd(data: any): void {
    this.defaultRightSize = data.sizes[1];
  }

  doExpandPanel(): void {
    this.defaultRightSize = 240;
  }

  doClosePanel(): void {
    this.defaultRightSize = 32;
  }

  addLink(): void {
    this.nav.addLink();
  }

  onMenuSelected(data: any) {
    this.nav.showLink(data.name);
  }
}
