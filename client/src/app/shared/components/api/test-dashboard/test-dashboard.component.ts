import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavTabImplService} from '../../../../core/services/impl/nav-tab-impl.service';
import {Subscription} from 'rxjs';
import {DashBoardShowingMetadata} from '../../../../core/services/entity/ApiMenu';
import {CollectionWorkBenchComponent} from '../work-bench/collection-work-bench/collection-work-bench.component';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss']
})
export class TestDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('collection', {static: true}) collection: CollectionWorkBenchComponent;
  defaultRightSize = 32;
  data: DashBoardShowingMetadata;
  showingTabData: Subscription;

  constructor(
    private navTabImplService: NavTabImplService
  ) {
  }

  ngOnInit(): void {
    this.defaultRightSize = 32;
    this.showingTabData = this.navTabImplService.getShowingTab().subscribe((res: DashBoardShowingMetadata) => {
      this.data = res;
      if (res.type === 'collection') {
        this.collection.setCollectionData(res.id, res.isEditing);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.showingTabData) {
      this.showingTabData.unsubscribe();
    }
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

  run(): void {
  }
}
