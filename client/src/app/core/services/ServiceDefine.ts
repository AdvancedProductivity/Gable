import {Observable} from 'rxjs';
import {ApiMenuCollection} from './entity/ApiMenu';

export interface ApiMenuService{

  getMenus: () => Observable<ApiMenuCollection[]>;

}
