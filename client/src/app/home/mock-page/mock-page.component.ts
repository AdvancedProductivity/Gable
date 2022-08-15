import {Component, OnInit, ViewChild} from '@angular/core';
import {TreeDataEditorComponent} from '../../shared/components/api/work-bench/http-work-bench/tree-data-editor/tree-data-editor.component';

@Component({
  selector: 'app-mock-page',
  templateUrl: './mock-page.component.html',
  styleUrls: ['./mock-page.component.scss']
})
export class MockPageComponent implements OnInit {
  @ViewChild('treeDataEditorComponent', {static: true}) vi: TreeDataEditorComponent;
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
}

