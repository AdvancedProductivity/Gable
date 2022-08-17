import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UrlDocNode} from '../../../../core/services/entity/Docs';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-http-url-doc',
  templateUrl: './http-url-doc.component.html',
  styleUrls: ['./http-url-doc.component.scss']
})
export class HttpUrlDocComponent implements OnInit, OnChanges {
  @Input() url: UrlDocNode;
  @Input() readonly = false;
  urlStr = '';
  isIn = false;
  isReady = false;
  constructor(
    private trans: TranslateService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard) { }

  @Input() get getData(): any {
    return this.url;
  }

  ngOnInit(): void {
    if (!this.url) {
      this.url = new UrlDocNode();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.readonly && changes.readonly.currentValue) {
      this.isReady = true;
    }
    if (changes.url && changes.url.currentValue) {
      this.urlStr = changes.url.currentValue.url;
      this.isReady = true;
    }
  }

  apply() {
    // eslint-disable-next-line max-len
    const arr = this.urlStr.match(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)(:([^\/]*))?((\/[\w\/-]+)*\/)([\w\-\.]+[^#?\s]+)(\?([^#]*))?(#(.*))?$/i);
    if (Array.isArray(arr) && arr.length > 9) {
      console.log('zzq see url', arr);
      this.url.host = arr[3];
      this.url.path = arr[6] + arr[8];
      this.url.url = this.urlStr;
      this.isReady = true;
    } else {
      this.isReady = false;
      this.tip('MESSAGE.PARSER_ERROR');
    }
  }

  copy(type: number) {
    let text;
    if (type === 0) {
      text = this.url.host;
    } else if (type === 1) {
      text = this.url.path;
    }else {
      text = this.url.url;
    }
    if (this.clipboard.copy(text)) {
      this.tip('MESSAGE.COPY_SUCCESS');
    }
  }

  private tip(str: string){
    this.trans.get([str,'MESSAGE.I_KNOW']).subscribe(msg => {
      this.snackBar.open(msg[str], msg['MESSAGE.I_KNOW'], {
        duration: 2 * 1000,
      });
    });
  }
}
