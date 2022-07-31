import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavTabImplService} from '../../../../core/services/impl/nav-tab-impl.service';
import {OpeningNavTab} from '../../../../core/services/entity/ApiMenu';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-api-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  method = ['GET', 'POST', 'DELETE', 'PUT'];
  navs: OpeningNavTab[];
  subs: Subscription;

  constructor(
    private navTabImplService: NavTabImplService
  ) {
  }

  ngOnDestroy(): void {
    if (!this.subs) {
      this.subs.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subs = this.navTabImplService.getTabsData().subscribe(res => {
      console.log('zzq see nav init');
      this.navs = res;
    });
  }

  showLink(l: string) {
  }

  closeAllTabs(): void {
    this.navTabImplService.closeAllTab();
  }

  close(tab: OpeningNavTab): void {
    this.navTabImplService.closeTab(tab.tabId);
  }

  switchNav(link) {
    this.navTabImplService.openTabs(link);
    console.log('zzq see opening', link);
  }
}
