import { Injectable } from '@angular/core';
import {ElectronService} from './electron/electron.service';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private from = 'electron';

  constructor(
    private $gaService: GoogleAnalyticsService,
    private elect: ElectronService
  ) {
    if (!this.elect.isElectron) {
      this.from = window.location.hostname;
      console.log('not electron', this.from);
    }
  }

  public async runHttp(server: string, way: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('run_http');
    } else {
      this.$gaService.gtag('event', 'run_http', {
        from: this.from,
        way,
        server
      });
    }
    return Promise.resolve();
  }

  public async comeOn(location: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('ComeOn');
    } else{
      this.$gaService.gtag('event', 'ComeOn', {
        from: this.from,
        location
      });
    }
    return Promise.resolve();
  }

  public async persistenceFile(location: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('persistenceFile', location);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'persistenceFile', {
      from: this.from,
      location
    });
    return Promise.resolve();
  }

  public async addCollection(): Promise<any> {
    return this.event('addCollection');
  }

  public async updateHttpCache(): Promise<any> {
    return this.event('updateHttpCache');
  }

  public async addBaseDoc(): Promise<any> {
    return this.event('addBaseDoc');
  }

  public async addSubDoc(level: any): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('addSubDoc', '' + level);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'addSubDoc', {
      from: this.from,
      level
    });
    return Promise.resolve();
  }

  public async addDoc(): Promise<any> {
    return this.event('addDoc');
  }

  public async fullScreen(location: string, inDoc: boolean): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('fullScreen', location + '_' + inDoc);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'fullScreen', {
      from: this.from,
      location,
      inDoc,
    });
    return Promise.resolve();
  }

  public async openLink(link: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('openLink', link);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'openLink', {
      from: this.from,
      link
    });
    return Promise.resolve();
  }

  public async renameHttp(): Promise<any> {
    return this.event('renameHttp');
  }

  public async saveApiName(): Promise<any> {
    return this.event('saveApiDefineFromCache');
  }

  public async renderDoc(): Promise<any> {
    return this.event('renderDoc');
  }

  public async saveDoc(): Promise<any> {
    return this.event('saveDoc');
  }

  public async editDoc(): Promise<any> {
    return this.event('editDoc');
  }

  public async discardChange(): Promise<any> {
    return this.event('discardChange');
  }

  public async changeLanguage(): Promise<any> {
    return this.event('changeLanguage');
  }

  public async appendDoc(location): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('appendDoc', location);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'appendDoc', {
      from: this.from,
      location
    });
    return Promise.resolve();
  }

  public async addHttp(): Promise<any> {
    return this.event('addHttp');
  }

  public async learnMore(location: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec('LearnMore', location);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', 'LearnMore', {
      from: this.from,
      location
    });
    return Promise.resolve();
  }

  private analysisByElec(action: string, label?: string) {
    const s = label ? '_' + label : '';
    const params = {
      ec: 'Gable Client',
      ea: action,
      el: this.from + s
    };
    this.elect.ipcRenderer.sendSync('analysis', params);
  }

  private async event(eventName: string): Promise<any> {
    if (this.elect.isElectron) {
      this.analysisByElec(eventName);
      return Promise.resolve();
    }
    this.$gaService.gtag('event', eventName, {
      from: this.from
    });
    return Promise.resolve();
  }
}
