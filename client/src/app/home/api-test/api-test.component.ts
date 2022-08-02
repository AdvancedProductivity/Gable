import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {TestDashboardComponent} from '../../shared/components/api/test-dashboard/test-dashboard.component';
import {NavTabImplService} from '../../core/services/impl/nav-tab-impl.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {
  @ViewChild('dashboardComponent', {static: true}) dashboardComponent: TestDashboardComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private navTabImplService: NavTabImplService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
  }

  onMenuReady(data: any) {
    this.spinner.hide();
  }

  // onMenuSelected(data: NavChangeEvent) {
  //   let openTab: OpeningNavTab;
  //
  //   const da = {
  //     name: data.name,
  //     type: data.type,
  //     id: data.id,
  //   };
  //   this.navTabImplService.openTabs(openTab, data.isCreated);
  // }
}
