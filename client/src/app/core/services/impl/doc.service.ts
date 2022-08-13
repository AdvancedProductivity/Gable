import { Injectable } from '@angular/core';
import {DocStorageService} from '../storage/doc-storage.service';
import {Doc} from '../entity/Docs';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private docCache: Doc[];
  constructor(private docStorageService: DocStorageService) {
  }

  public addDoc(name: string): Promise<number> {
    const doc = new Doc();
    doc.name = name;
    doc.dateCreated = new Date().getTime();
    if (!Array.isArray(this.docCache)) {
      this.docCache = [];
    }
    this.docCache.push(doc);
    return this.docStorageService.addDoc(doc);
  }

  public async getAllDocs(): Promise<Doc[]> {
    if (!this.docCache) {
      this.docCache = await this.docStorageService.getAllDocs();
    }
    return new Promise<Doc[]>(resolve => {
      resolve(this.docCache);
    });
  }
}
