import {ConfigService} from '../../ConfigService';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ConfigServiceWebImpl implements ConfigService {
  private cache: Map<string, string>;

  constructor() {
    this.cache = new Map();
  }

  getConfig(key: string): Observable<string> {
    let value = this.cache.get(key);
    if (value) {
      return of(value);
    }
    value = localStorage.getItem(key);
    if (value) {
      this.cache.set(key, value);
    }
    return of(value);
  }

  updateOrCreateConfig(key: string, value: string): Observable<string> {
    localStorage.setItem(key, value);
    this.cache.set(key, value);
    return of(value);
  }

}
