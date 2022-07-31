import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiMenuServiceImpl} from '../../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuCollection} from '../../../../../core/services/entity/ApiMenu';
import {NavTabImplService} from '../../../../../core/services/impl/nav-tab-impl.service';

@Component({
  selector: 'app-collection-work-bench',
  templateUrl: './collection-work-bench.component.html',
  styleUrls: ['./collection-work-bench.component.scss']
})
export class CollectionWorkBenchComponent implements OnInit, OnDestroy {
  showIcon = false;
  showEdit = false;
  collectionName: string;
  collectionNameCopy: string;
  collectionId: number;

  constructor(
    private menuService: ApiMenuServiceImpl,
    private navTabImplService: NavTabImplService
  ) {
  }

  ngOnInit(): void {
  }

  setCollectionData(id: number) {
    this.menuService.getCollectionData(id).subscribe((collectionData: ApiMenuCollection) => {
      this.collectionNameCopy = collectionData.name;
      this.collectionName = collectionData.name;
      this.collectionId = collectionData.id;
    });
  }

  editCollectionName() {
    this.showEdit = true;
    setTimeout(() => {
      const input = document.getElementById('collectionNameInput');
      input.focus();
    }, 5);
  }

  updateCollectionName() {
    this.showEdit = false;
    if (!this.collectionName) {
      this.collectionName = this.collectionNameCopy;
      return;
    }
    // update tree‘s name
    this.menuService.updateCollectionName(this.collectionId, this.collectionName);
    // update tab's name
    this.navTabImplService.updateTabName(this.collectionId, 'collection', this.collectionName);
  }

  ngOnDestroy(): void {
  }
}
