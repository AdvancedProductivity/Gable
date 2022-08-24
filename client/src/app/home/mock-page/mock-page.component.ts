import {Component, OnInit, ViewChild} from '@angular/core';
import {
  JsonTableEditorComponent
} from '../../shared/components/api/work-bench/http-work-bench/json-table-editor/json-table-editor.component';
import {DocJsonTableNode} from "../../core/services/entity/Docs";

@Component({
  selector: 'app-mock-page',
  templateUrl: './mock-page.component.html',
  styleUrls: ['./mock-page.component.scss']
})
export class MockPageComponent implements OnInit {
  @ViewChild('treeDataEditorComponent', {static: true}) vi: JsonTableEditorComponent;
  code = `
  {
    "a":"123",
    "b":123,
    "c": true,
    "d": {
        "e": "sd",
        "f": 123
    },
    "g": [
        {
            "h": "123",
            "i": 89
        }
    ],
    "j":[
        1,2,3
    ],
    "k":[
        {
            "l":123,
            "m": true
        }
    ]
}
  `;
  editorOptions = {theme: 'vs-light', language: 'json'};
  readonly = false;

  ngOnInit(): void {
  }

  gen() {
    this.vi.gen(JSON.parse(this.code));
  }

  onDataC(data: DocJsonTableNode[]) {
    console.log('zzq see doc updated', data);
  }
}

