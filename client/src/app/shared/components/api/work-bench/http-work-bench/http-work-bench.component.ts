import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {RequestTabsComponent} from './request-tabs/request-tabs.component';
import {ApiMenuServiceImpl} from '../../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuItem} from '../../../../../core/services/entity/ApiMenu';
import {ApiHeaderOperationComponent} from '../../api-header-operation/api-header-operation.component';
import {debounceTime, Subject} from 'rxjs';
import {getEmptyResponse, HttpApi} from '../../../../../core/services/entity/HttpApi';
import {
  getCommonKeyValue,
  HttpComponentHotDataUpdateEvent,
  parserKeyValue
} from '../../../../../core/services/entity/ApiPart';
import {HttpApiService} from '../../../../../core/services/impl/http-api.service';
import {ApiRunnerService} from '../../../../../core/services/impl/api-runner.service';
import {ResponseTabsComponent} from './response-tabs/response-tabs.component';

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit, OnDestroy {
  @ViewChild(RequestTabsComponent) req!: RequestTabsComponent;
  @ViewChild(ResponseTabsComponent) resp!: ResponseTabsComponent;
  @ViewChild(ApiHeaderOperationComponent) header!: ApiHeaderOperationComponent;
  @Output() run = new EventEmitter();
  urlSubject = new Subject<void>();
  url: string;
  curMethod: string;
  httpApi: HttpApi;
  id: number;

  constructor(
    private menuService: ApiMenuServiceImpl,
    private apiRunnerService: ApiRunnerService,
    private httpApiService: HttpApiService
  ) {
  }

  ngOnInit(): void {
    this.urlSubject.pipe(debounceTime(1000))
      .subscribe(this.handleUrlChange);
  }

  setApiData(id: number, isEdit: boolean = false) {
    this.id = id;
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
    this.resp.setResp(getEmptyResponse());
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
    this.apiRunnerService.runHttp(this.id, this.httpApi).subscribe({
      next: (res) => {
        console.log('receive response', res);
        this.resp.setResp(res);
      },
      error: (error) => {
        const emptyResponse = getEmptyResponse();
        emptyResponse.content = error;
        this.resp.setResp(emptyResponse);
      }
    });
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

  reGetDefine(): void {
    this.httpApiService.removeCache(this.id).then(res => {
      this.setApiData(this.id, false);
    });
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
    const arr = this.url.match(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)(:([^\/]*))?((\/[\w\/-]+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/i);
    if (arr) {
      console.log('zzq see url', arr);
      this.httpApi.protocol = arr[2];
      const host = arr[3];
      this.httpApi.host = host;
      this.httpApi.hostArr = host.split('.');
      const port = arr[5];
      this.httpApi.port = port ? port : '80';
      const path = arr[6] + arr[8];
      this.httpApi.path = path;
      const pathArr = path.split('/').filter(i => i);
      this.httpApi.pathArray = pathArr;
      const queryStr = arr[10];
      if (queryStr) {
        const keyValueArr = queryStr.split('&');
        const keyValue = [];
        const set = new Set<string>();
        keyValueArr.forEach(item => {
          const field = item.split('=');
          if (field[0]) {
            set.add(field[0] + '_' + field[1]);
            keyValue.push(parserKeyValue(field[0], field[1]));
          }
        });
        keyValue.push(getCommonKeyValue());
        const oldArr = this.httpApi.query;
        if (oldArr) {
          oldArr.forEach(item => {
            if (item.key && item.value && !set.has(item.key + '_' + item.value)) {
              keyValue.push(item);
            }
          });
        }
        keyValue.push(getCommonKeyValue());
        this.httpApi.query = keyValue;
        this.req.setHttpData(this.httpApi);
      }
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
