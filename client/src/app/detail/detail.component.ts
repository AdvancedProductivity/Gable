import { Component, OnInit } from '@angular/core';
import {DataServiceImplService} from '../core/services/impl/data-service-impl.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  infos: any[] = [];
  constructor(private dataServiceImplService: DataServiceImplService) { }

  ngOnInit(): void {
    console.log('DetailComponent INIT', this.infos);
    this.dataServiceImplService.getData().subscribe({
      next: value => {
        if (value instanceof Array) {
          this.infos = value;
        }else {
          console.log('receive data not array', value);
        }
        console.log('DetailComponent INIT', this.infos);
      },
      error: err => {
        console.log('error happens', err);
      },
      complete: () => {
        console.log('after subscribe');
      }
    });
   }

}
