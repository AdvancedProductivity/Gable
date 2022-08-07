import {Observable} from 'rxjs';

export interface ConfigService {
  getConfig: (key: string) => Observable<string>;

  updateOrCreateConfig: (key: string, value: string) => Observable<string>;

  getConfigSync(key: string);

}
