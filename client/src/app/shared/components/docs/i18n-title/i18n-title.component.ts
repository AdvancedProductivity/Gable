import {Component, Input, OnInit} from '@angular/core';
import {I18nDocNode} from '../../../../core/services/entity/Docs';

@Component({
  selector: 'app-i18n-title',
  templateUrl: './i18n-title.component.html',
  styleUrls: ['./i18n-title.component.scss']
})
export class I18nTitleComponent implements OnInit {
  @Input() data: I18nDocNode;
  @Input() readonly = false;

  constructor() { }

  @Input() get getData(): any {
    return this.data;
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = new I18nDocNode();
      this.data.i18n = 'PAGES.DOCS.DOC_URL';
      this.data.level = 3;
    }
  }

  apply() {

  }
}
