import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavComponent} from '../../shared/components/api/nav/nav.component';
import {TestDashboardComponent} from '../../shared/components/api/test-dashboard/test-dashboard.component';
import {NavTabImplService} from '../../core/services/impl/nav-tab-impl.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.scss']
})
export class ApiTestComponent implements OnInit {
  @ViewChild('apiNav', {static: false}) nav: NavComponent;
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

  addLink(): void {
    // this.nav.addLink();
  }

  onMenuSelected(data: any) {
    console.log('zzq see export data', data);
    this.navTabImplService.openTabs(data);
    this.dashboardComponent.setData(data);
    this.nav.showLink(data.name);
  }
}
