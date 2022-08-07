import { Injectable } from '@angular/core';
import {ApiMenuCollection, ApiMenuItem} from '../../entity/ApiMenu';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom, map} from 'rxjs';
import {ConfigServiceImpl} from '../../impl/ConfigServiceImpl';

@Injectable({
  providedIn: 'root'
})
export class MenuStorageRemoteService {

  constructor(
    private config: ConfigServiceImpl,
    private httpClient: HttpClient
  ) { }

  public addCollection(collection: ApiMenuCollection): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/collection`, collection).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public getCollection(id: number): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/collection`, {params: {id} }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public getApiMenuItem(id: number): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/collection/item`, {params: {id} }).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public getAllMenus(): Promise<ApiMenuCollection[]> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/collection/all`).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public getAllMenuItems(): Promise<ApiMenuItem[]> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.get(`${server}/api/collection/allItems`).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public renameCollection(id: number, newName: string): Promise<void> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/collection/renameCollection`, {id, name: newName}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public renameMenuItem(id: number, newName: string): Promise<void> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/collection/renameItem`, {id, name: newName}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async addMenuItemToDb(apiData: ApiMenuItem): Promise<void> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.post(`${server}/api/collection/item`, apiData).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }

  public async updateTagAndVersion(id: number, tag: string, version: number): Promise<any> {
    const server = this.config.getConfigSync('gableServer');
    return firstValueFrom(this.httpClient.put(`${server}/api/collection/tag`, {tag, version, id}).pipe(
      map((res: any) => {
        if (res.result) {
          return res.data;
        }
      })
    ));
  }
}
