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
import {ConfigServiceImpl} from '../../../core/services/impl/ConfigServiceImpl';
import {HttpBlock} from '../plugins/http-block';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  docId: number;

  readOnly = false;
  editorOptions = {theme: 'vs-light', language: 'json'};
  code = '';
  editor = undefined;
  docs;

  constructor(private config: ConfigServiceImpl) {
  }

  ngOnInit(): void {
    const docsStr = localStorage.getItem('docs');
    console.log('zzq see get logs', docsStr);
    if (docsStr) {
      this.docs = JSON.parse(docsStr);
      console.log('do parser');
    } else {
      this.docs = {
        time: 1660228893588,
        blocks: [],
        version: '2.25.0'
      };
    }
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

  stash(): void {
    this.editor.save().then((res) => {
      this.code = JSON.stringify(res, null, '\t');
      localStorage.setItem('docs', this.code);
    });
  }

  setDocId(docId: number) {
    this.docId = docId;
    if (!this.editor) {
      setTimeout(() => {
        this.editor = new EditorJS({
          readOnly: false,
          holderId: 'editorjs',
          placeholder: '请输入回车键盘选择可输入类型',
          tools: this.getTools(),
          data: this.docs
        });
      }, 200);
    } else {
    }
    console.log('zzq see set value', docId);
  }

  private getTools() {
    let server = this.config.getConfigSync('gableServer');
    if (!server) {
      server = 'http://localhost:2208';
    }
    return {
      header: {
        class: Header,
        inlineToolbar: ['marker', 'inlineCode'],
        config: {
          placeholder: '',
        },
      },
      json: HttpBlock,
      image: {
        class: Image,
        inlineToolbar: true,
        config: {
          types: 'image/*, video/mp4',
          endpoints: {
            byFile: encodeURI(`${server}/api/file?from=${server}`),
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
    };
  }
}
