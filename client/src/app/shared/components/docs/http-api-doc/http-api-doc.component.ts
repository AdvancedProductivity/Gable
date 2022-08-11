import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ApiMenuServiceImpl} from '../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuCollection, ApiMenuItem} from '../../../../core/services/entity/ApiMenu';
import {HttpWorkBenchComponent} from '../../api/work-bench/http-work-bench/http-work-bench.component';
import {HttpApiService} from '../../../../core/services/impl/http-api.service';
import {HttpDocBlockData} from '../../../../core/services/entity/Docs';

@Component({
  selector: 'app-http-api-doc',
  templateUrl: './http-api-doc.component.html',
  styleUrls: ['./http-api-doc.component.scss']
})
export class HttpApiDocComponent implements OnInit {
  @Input() docData: HttpDocBlockData;
  @Input() readonly = false;
  @ViewChild('http', {static: false}) http: HttpWorkBenchComponent;
  applied = false;
  cos: ApiMenuCollection[];
  https: ApiMenuItem[];
  ocId: number;
  httpId: number;

  constructor(
    private menuService: ApiMenuServiceImpl,
    private httpApiService: HttpApiService
  ) {
  }
  @Input() get getData(): any {return this.docData;}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe(res => {
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
    const docData = new HttpDocBlockData();
    this.cos.forEach(item => {
      if (item.id === this.ocId) {
        item.children.forEach(i => {
          if (i.id === this.httpId) {
            docData.httpName = i.name;
            docData.collectionName = item.name;
            docData.httpId = this.httpId;
            docData.version = i.version;
          }
        });
      }
    });
    this.httpApiService.getCache(this.httpId).subscribe(res => {
      docData.define = res;
      setTimeout(() => {
        this.http.setDocData(docData, this.readonly);
      }, 20);
    });
  }
}
