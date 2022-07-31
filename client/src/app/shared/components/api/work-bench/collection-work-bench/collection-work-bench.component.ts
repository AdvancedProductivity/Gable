import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-work-bench',
  templateUrl: './collection-work-bench.component.html',
  styleUrls: ['./collection-work-bench.component.scss']
})
export class CollectionWorkBenchComponent implements OnInit {
  showIcon = false;
  showEdit = false;
  collectionName = 'fcyvguhijokpl';
  constructor() { }

  ngOnInit(): void {
  }

  editCollectionName() {
    this.showEdit = true;
    setTimeout(() => {
      const input = document.getElementById('collectionNameInput');
      input.focus();
    }, 5);
  }

  updateCollectionName() {
    this.showIcon = false;
  }
}
