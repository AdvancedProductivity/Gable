import { Component, OnInit } from '@angular/core';
import {DataServiceImplService} from "../core/services/data-service-impl.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  infos: any[] = [];
  constructor(private dataServiceImplService: DataServiceImplService) { }

  ngOnInit(): void {
    this.dataServiceImplService.getData().subscribe((res) => {
      if (res instanceof Array) {
        this.infos = res;
      }else {
        console.log('receive data not array', res);
      }
      console.log('DetailComponent INIT', this.infos);
    }, error => {
      console.log('DetailComponent INIT error', error);
    });
   }

}
