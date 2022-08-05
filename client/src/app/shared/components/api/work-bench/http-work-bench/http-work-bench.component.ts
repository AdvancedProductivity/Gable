import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {RequestTabsComponent} from './request-tabs/request-tabs.component';
import {ApiMenuServiceImpl} from '../../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuItem} from '../../../../../core/services/entity/ApiMenu';
import {ApiHeaderOperationComponent} from '../../api-header-operation/api-header-operation.component';
import {debounceTime, Subject} from 'rxjs';
import {HttpApi} from '../../../../../core/services/entity/HttpApi';
import {HttpComponentHotDataUpdateEvent} from '../../../../../core/services/entity/ApiPart';
import {HttpApiService} from '../../../../../core/services/impl/http-api.service';

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit, OnDestroy {
  @ViewChild(RequestTabsComponent) req!: RequestTabsComponent;
  @ViewChild(ApiHeaderOperationComponent) header!: ApiHeaderOperationComponent;
  @Output() run = new EventEmitter();
  urlSubject = new Subject<void>();
  url: string;
  curMethod: string;
  httpApi: HttpApi;

  constructor(
    private menuService: ApiMenuServiceImpl,
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
    this.urlSubject.pipe(debounceTime(1000))
      .subscribe(this.handleUrlChange);
  }

  setApiData(id: number, isEdit: boolean = false) {
    this.menuService.getApiData(id).subscribe((api: ApiMenuItem) => {
      this.header.setInitStatus(api.id, api.collectionId, api.name, isEdit, api.version, api.defineId);
    });
    this.httpApiService.getCache(id).subscribe(res => {
      this.httpApi = res;
      this.req.setHttpData(res);
      this.header.setCacheVersion(res.version);
      this.curMethod = res.method;
      this.url = res.url;
    });
  }

  doSomething(): void {
    this.run.next({});
  }

  methodChange(data: any): void {
    if (!this.httpApi) {
      return;
    }
    this.httpApi.method = this.curMethod;
    this.doHttpApiUpdateCache();
  }

  onSend() {
    console.log('zzq see data wait for send', this.httpApi);
    // @ts-ignore
    gtag('event', 'run_test', {
      type: 'Http',
    });
  }

  onReqTabChanged(tabKey: string) {
    console.log('see tab changed to be ', tabKey);
  }

  onUrlChange() {
    this.urlSubject.next();
  }

  ngOnDestroy(): void {
    this.urlSubject.unsubscribe();
  }

  onApiUpdate(updateAction: HttpComponentHotDataUpdateEvent) {
    if (!this.httpApi){
      return;
    }else if (updateAction.action === 'query') {
      this.httpApi.query = updateAction.data;
    } else if (updateAction.action === 'header') {
      this.httpApi.header = updateAction.data;
    } else if (updateAction.action === 'bodyType') {
      this.httpApi.bodyType = updateAction.data;
    } else if (updateAction.action === 'bodyTextType') {
      this.httpApi.bodyTextType = updateAction.data;
    } else if (updateAction.action === 'url_encode ') {
      this.httpApi.bodyUrlEncoded = updateAction.data;
    } else if (updateAction.action === 'raw') {
      this.httpApi.bodyText = updateAction.data;
    } else if (updateAction.action === 'graph_query') {
      this.httpApi.bodyGraphQlQuery = updateAction.data;
    } else if (updateAction.action === 'graph_var') {
      this.httpApi.bodyGraphQlVar = updateAction.data;
    }
    this.doHttpApiUpdateCache();
  }

  private handleUrlChange = () => {
    if (!this.httpApi) {
      return;
    }
    this.httpApi.url = this.url;
    this.doHttpApiUpdateCache();
  };

  private doHttpApiUpdateCache() {
    this.httpApi.version = new Date().getTime();
    this.httpApiService.updateCache(this.httpApi);
    this.header.setCacheVersion(this.httpApi.version);
  }
}
