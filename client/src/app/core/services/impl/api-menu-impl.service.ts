import { Injectable } from '@angular/core';
import {ApiMenuCollection} from '../entity/ApiMenu';
import {Observable} from 'rxjs';
import {ElectronService} from '../electron/electron.service';
import {ApiMenuWebImplService} from './web/api-menu-web-impl.service';
import {ApiMenuService} from '../ServiceDefine';
import {ApiMenuElecImplService} from './electron/api-menu-elec-impl.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuServiceImpl implements ApiMenuService{

  constructor(
    private electronService: ElectronService,
    private electronImpl: ApiMenuElecImplService,
    private webImpl: ApiMenuWebImplService
  ) {
  }


  getMenus(): Observable<ApiMenuCollection[]> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getMenus();
    } else {
      return this.webImpl.getMenus();
    }
  }
}
