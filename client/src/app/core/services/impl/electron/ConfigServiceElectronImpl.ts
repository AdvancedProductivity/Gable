import {ConfigService} from '../../ConfigService';
import {catchError, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {ElectronService} from '../../electron/electron.service';


@Injectable({
  providedIn: 'root'
})
export class ConfigServiceElectronImpl implements ConfigService {
  private cache: Map<string, string>;

  constructor(private electronService: ElectronService) {
    this.cache = new Map();
  }

  getConfig(key: string): Observable<string> {
    let value = this.cache.get(key);
    if (value) {
      return of(value);
    }
    value = this.electronService.ipcRenderer.sendSync('get-config', key);
    this.cache.set(key, value);
    return of(value);
  }

  updateOrCreateConfig(key: string, value: string): Observable<string> {
    const res = this.electronService.ipcRenderer.sendSync('set-config', key, value);
    if (res === 'success') {
      this.cache.set(key, value);
      return of(res);
    }
    return of(res);
  }

  getConfigSync(key: string): string {
    let value = this.cache.get(key);
    if (value) {
      return value;
    }
    value = this.electronService.ipcRenderer.sendSync('get-config', key);
    this.cache.set(key, value);
    return value;
  }
}
