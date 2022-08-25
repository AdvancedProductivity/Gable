import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloseIconObservableService {
  private showSubject = new Subject<{ key: string; v: boolean }>();
  constructor() { }

  getShowingStatus(): Observable<{ key: string; v: boolean }> {
    return this.showSubject.asObservable();
  }

  public emit(v: { key: string; v: boolean }) {
    this.showSubject.next(v);
  }

}
