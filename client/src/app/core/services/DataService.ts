import {Observable} from "rxjs";

export interface DataService {
  getData: () => Observable<any[]>;
}
