import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {DataServiceImplService} from '../core/services/data-service-impl.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private dataServiceImplService: DataServiceImplService) {
  }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  addItem() {
    this.dataServiceImplService.addItem().subscribe((v) => {
      console.log('zzq see add data', v);
    });
  }

  clearItem() {
    this.dataServiceImplService.clearAll().subscribe((v) => {
      console.log('zzq see clear data', v);
    });
  }
}
