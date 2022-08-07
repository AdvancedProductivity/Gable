import {Injectable} from '@angular/core';
import {ConfigService} from '../ConfigService';
import {Observable} from 'rxjs';
import {ElectronService} from '../electron/electron.service';
import {ConfigServiceElectronImpl} from './electron/ConfigServiceElectronImpl';
import {ConfigServiceWebImpl} from './web/ConfigServiceWebImpl';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceImpl implements ConfigService {

  constructor(private electronService: ElectronService,
              private electronImpl: ConfigServiceElectronImpl,
              private webImpl: ConfigServiceWebImpl) {
  }

  getConfig(key: string): Observable<string> {
    if (this.electronService.isElectron) {
      return this.electronImpl.getConfig(key);
    } else {
      return this.webImpl.getConfig(key);
    }
  }

  updateOrCreateConfig(key: string, value: string): Observable<string> {
    if (this.electronService.isElectron) {
      return this.electronImpl.updateOrCreateConfig(key, value);
    } else {
      return this.webImpl.updateOrCreateConfig(key, value);
    }
  }

  getConfigSync(key: string) {
    if (this.electronService.isElectron) {
      return this.electronImpl.getConfigSync(key);
    } else {
      return this.webImpl.getConfigSync(key);
    }
  }

}
