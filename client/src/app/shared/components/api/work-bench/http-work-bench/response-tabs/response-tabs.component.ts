import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpApiResponse} from '../../../../../../core/services/entity/HttpApi';
import {BodyTextComponent} from './body-text/body-text.component';
import {DocJsonTableNode} from '../../../../../../core/services/entity/Docs';
import {HttpComponentHotDataUpdateEvent} from '../../../../../../core/services/entity/ApiPart';

@Component({
  selector: 'app-response-tabs',
  templateUrl: './response-tabs.component.html',
  styleUrls: ['./response-tabs.component.scss']
})
export class ResponseTabsComponent implements OnInit {
  @ViewChild('textComponent', {static: true}) textCom: BodyTextComponent;
  @Output() dataChanged = new EventEmitter<HttpComponentHotDataUpdateEvent>();
  tabs = ['Body', 'Cookies', 'Headers', 'Post-Script'];
  curTab = 'Body';
  code: number;
  timeTakes: number;
  size: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  setResp(response: HttpApiResponse): void {
    this.code = response.code;
    this.timeTakes = response.timeTakes;
    this.size = response.size;
    this.textCom.setText(response.content);
    this.textCom.setLang(response.bodyType);
  }

  setRespDoc(doc: DocJsonTableNode[]) {
    this.textCom.setRespDoc(doc);
  }

  onRespDocChanged(newDoc: DocJsonTableNode[]) {
    this.dataChanged.next({action: 'respDoc', data: newDoc});
  }
}
