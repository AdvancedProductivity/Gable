import {Observable} from "rxjs";

export interface DataService {
  getData: () => Observable<any[]>;
}

export interface addItem {
  getData: () => Observable<any>;
}
