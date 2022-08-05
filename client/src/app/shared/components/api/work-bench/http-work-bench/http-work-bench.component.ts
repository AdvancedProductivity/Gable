import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {RequestTabsComponent} from './request-tabs/request-tabs.component';
import {ApiMenuServiceImpl} from '../../../../../core/services/impl/api-menu-impl.service';
import {ApiMenuItem} from '../../../../../core/services/entity/ApiMenu';
import {ApiHeaderOperationComponent} from '../../api-header-operation/api-header-operation.component';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit, OnDestroy {
  @ViewChild(RequestTabsComponent)
  req!: RequestTabsComponent;
  @ViewChild(ApiHeaderOperationComponent)
  header!: ApiHeaderOperationComponent;
  @Output() run = new EventEmitter();
  urlSubject = new Subject<void>();
  url: string;

  constructor(
    private menuService: ApiMenuServiceImpl
  ) {
  }

  ngOnInit(): void {
    this.urlSubject.pipe(debounceTime(1000))
      .subscribe(() => {
        console.log('url changed', this.url);
      });
  }

  setApiData(id: number, isEdit: boolean = false) {
    this.menuService.getApiData(id).subscribe((api: ApiMenuItem) => {
      this.header.setInitStatus(api.id, api.collectionId, api.name, isEdit);
    });
  }

  doSomething(): void {
    this.run.next({});
  }

  methodChange(data: any): void {
    console.log('zzq see method changed', data);
  }

  onSend() {
    const data: any = {};
    data.req = this.req.getData();
    console.log('zzq see data wait for send', data);
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
}
