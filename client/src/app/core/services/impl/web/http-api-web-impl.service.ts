import { Injectable } from '@angular/core';
import {HttpApiHistoryCache} from '../../entity/HttpApi';
import {from, Observable, of} from 'rxjs';
import {db} from '../../db';

@Injectable({
  providedIn: 'root'
})
export class HttpApiWebImplService {
  private cacheMap = new Map<number, HttpApiHistoryCache>();
  constructor() { }

  public addApiDefine(data: HttpApiHistoryCache): void {
    this.cacheMap.set(data.id, data);
  }

  public getCache(id: number): Observable<HttpApiHistoryCache> {
    if (this.cacheMap.has(id)) {
      return of(this.cacheMap.get(id));
    }
    return from(this.getFromCache(id));
  }

  public updateCache(data: HttpApiHistoryCache): void {
    this.cacheMap.set(data.id, data);
    db.httpApiCache.update(data.id, data).then(res => {
      console.log('update api define finished ', res);
    });
  }

  private async getFromCache(id: number): Promise<HttpApiHistoryCache> {
    const data = await db.httpApiCache.get(id);
    if (data) {
      this.cacheMap.set(id, data);
    }
    return new Promise(resolve => {
      resolve(data);
    });
  }
}
