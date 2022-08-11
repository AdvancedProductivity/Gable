import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuCollection, ApiMenuItem} from '../../../../core/services/entity/ApiMenu';
import {HttpWorkBenchComponent} from '../../api/work-bench/http-work-bench/http-work-bench.component';

@Component({
  selector: 'app-http-api-doc',
  templateUrl: './http-api-doc.component.html',
  styleUrls: ['./http-api-doc.component.scss']
})
export class HttpApiDocComponent implements OnInit {
  @ViewChild('http', {static: false}) http: HttpWorkBenchComponent;
  applied = false;
  cos: ApiMenuCollection[];
  https: ApiMenuItem[];
  ocId: number;
  httpId: number;

  constructor(
    private menu: ApiMenuServiceImpl
  ) {
  }

  ngOnInit(): void {
    this.menu.getMenus().subscribe(res => {
      this.cos = res;
    });
  }

  collectionChange(event: any) {
    this.cos.forEach(item => {
      if (item.id === event) {
        this.https = item.children;
        this.ocId = event;
      }
    });
  }

  httpChange(event: any) {
    console.log('c', event);
    this.httpId = event;
  }

  apply() {
    this.applied = true;
    setTimeout(() => {
      this.http.setApiData(this.httpId, false);
    }, 2000);
  }
}
