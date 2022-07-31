import { Injectable } from '@angular/core';
import {ApiMenuService} from '../../ServiceDefine';
import {ApiMenuCollection} from '../../entity/ApiMenu';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiMenuElecImplService implements ApiMenuService{

  constructor() { }

  getMenus(): Observable<ApiMenuCollection[]> {
    return undefined;
  }
}
