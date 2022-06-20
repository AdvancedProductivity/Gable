import {Observable} from "rxjs";

export interface DataService {
  getData: () => Observable<any[]>;

  addItem: () => Observable<any>;
}

