import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {RequestTabsComponent} from './request-tabs/request-tabs.component';
import {ApiMenuServiceImpl} from "../../../../../core/services/impl/api-menu-impl.service";
import {ApiMenuCollection, ApiMenuItem} from "../../../../../core/services/entity/ApiMenu";
import {ApiHeaderOperationComponent} from "../../api-header-operation/api-header-operation.component";

@Component({
  selector: 'app-http-work-bench',
  templateUrl: './http-work-bench.component.html',
  styleUrls: ['./http-work-bench.component.scss']
})
export class HttpWorkBenchComponent implements OnInit {
  @ViewChild(RequestTabsComponent)
  req!: RequestTabsComponent;
  @ViewChild(ApiHeaderOperationComponent)
  header!: ApiHeaderOperationComponent;
  @Output() run = new EventEmitter();

  constructor(
    private menuService: ApiMenuServiceImpl
  ) {
  }

  ngOnInit(): void {
  }

  setApiData(id: number, isEdit: boolean = false) {
    this.menuService.getApiData(id).subscribe((api: ApiMenuItem) => {
      this.header.setInitStatus(api.id, api.name, isEdit);
    });
  }

  doSomething(): void {
    this.run.next({});
  }

  methodChange(data: any): void {
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
}
