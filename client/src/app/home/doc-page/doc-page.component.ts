import { Component, OnInit } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import Image from '@editorjs/image';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Delimiter from '@editorjs/delimiter';
// @ts-ignore
import Table from '@editorjs/table';
// @ts-ignore
import Checklist from '@editorjs/checklist';
// @ts-ignore
import Embed from '@editorjs/embed';
// @ts-ignore
import InlineCode from '@editorjs/inline-code';
// @ts-ignore
import Marker from '@editorjs/marker';

@Component({
  selector: 'app-doc-page',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss']
})
export class DocPageComponent implements OnInit {
  readOnly = false;
  editorOptions = {theme: 'vs-light', language: 'json'};
  code = '';
  editor = new EditorJS({
    readOnly: false,
    holderId : 'editorjs',
    placeholder: '请输入回车键盘选择可输入类型',
    tools: {
      header: {
        class: Header,
        inlineToolbar: ['marker', 'inlineCode'],
        config: {
          placeholder: '',
        },
      },
      image: {
        class: Image,
        inlineToolbar: true,
        config: {
          types: 'image/*, video/mp4',
          endpoints: {
            byFile: encodeURI('http://localhost:2208/api/file?from=http://localhost:2208'),
            byUrl: '/api/transport/fetch',
          },
          field: 'file',
          additionalRequestData: {
            map: JSON.stringify({
              url: 'file:url',
              size: 'file:size',
              mimetype: 'file:mime',
            }),
          },
        },
      },

      list: {
        class: List,
        inlineToolbar: true,
      },

      delimiter: Delimiter,

      table: {
        class: Table,
        inlineToolbar: true,
      },

      checklist: {
        class: Checklist,
        inlineToolbar: true,
      },

      /**
       * Inline Tools
       */
      inlineCode: {
        class: InlineCode,
        shortcut: 'CMD+SHIFT+C',
      },

      marker: {
        class: Marker,
        shortcut: 'CMD+SHIFT+M',
      },

      embed: Embed,
    }
  });
  constructor() { }

  ngOnInit(): void {
  }

  getJson(): void {
    this.editor.save().then((res) => {
      this.code = JSON.stringify(res, null, '\t');
    });
  }

  changeState() {
    this.readOnly = !this.readOnly;
    this.editor.readOnly.toggle();
  }
}
