import { Component, OnInit } from '@angular/core';
import {ConfigServiceImpl} from '../../core/services/impl/ConfigServiceImpl';
import {ApiRunnerService} from '../../core/services/impl/api-runner.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  serverUrl: string;
  proxyUrl: string;

  constructor(
    private snackBar: MatSnackBar,
    private trans: TranslateService,
    private apiRunnerService: ApiRunnerService,
    private config: ConfigServiceImpl
  ) {
  }

  ngOnInit(): void {
    this.config.getConfig('gableServer').subscribe((res: string) => {
      if (res && res !== 'null') {
        this.serverUrl = res;
      }
    });
    this.config.getConfig('proxyServer').subscribe((res: string) => {
      if (res) {
        this.proxyUrl = res;
      }
    });
  }

  applyGableServer(): void {
    if (!this.serverUrl) {
      this.showLocalTip();
      this.config.updateOrCreateConfig('gableServer', null);
      return;
    }
    this.apiRunnerService.ping(this.serverUrl).subscribe(res => {
      if (res.result) {
        this.showApplyTip();
        this.config.updateOrCreateConfig('gableServer', this.serverUrl);
      }
    }, error => {
      this.showErrorTip(error.message);
    });
  }

  applyProxyServer(): void {
    if (!this.proxyUrl) {
      this.showLocalTip();
      this.config.updateOrCreateConfig('proxyServer', null);
      return;
    }
    this.apiRunnerService.ping(this.proxyUrl).subscribe(res => {
      if (res.result) {
        this.showApplyTip();
        this.config.updateOrCreateConfig('proxyServer', this.proxyUrl);
      }
    },error => {
      this.showErrorTip(error.message);
    });
  }

  private showLocalTip() {
    this.trans.get(['PAGES.SETTING.LOCAL_TIP','MESSAGE.I_KNOW']).subscribe(msg => {
      this.snackBar.open(msg['PAGES.SETTING.LOCAL_TIP'], msg['MESSAGE.I_KNOW'], {
        duration: 2 * 1000,
      });
    });
  }

  private showApplyTip() {
    this.trans.get(['MESSAGE.APPLY_SUCCESS','MESSAGE.I_KNOW']).subscribe(msg => {
      this.snackBar.open(msg['MESSAGE.APPLY_SUCCESS'], msg['MESSAGE.I_KNOW'], {
        duration: 2 * 1000,
      });
    });
  }

  private showErrorTip(message) {
    this.trans.get(['MESSAGE.I_KNOW']).subscribe(msg => {
      this.snackBar.open(message, msg['MESSAGE.I_KNOW'], {
        duration: 5 * 1000,
      });
    });
  }
}
