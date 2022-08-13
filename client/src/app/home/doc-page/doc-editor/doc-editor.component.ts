import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
import {NgxSpinnerService} from 'ngx-spinner';
import {DocService} from '../../../core/services/impl/doc.service';
import {randomString} from '../../../core/services/utils/Uuid';

@Component({
  selector: 'app-doc-editor',
  templateUrl: './doc-editor.component.html',
  styleUrls: ['./doc-editor.component.scss']
})
export class DocEditorComponent implements OnInit {
  @Output() status = new EventEmitter<boolean>();
  @Output() nameChange = new EventEmitter<{ name: string; id: number }>();
  name: string;
  docId: number;
  readOnly = true;
  editor: EditorJS;

  constructor(
    private docService: DocService,
    private spinner: NgxSpinnerService,
    private config: ConfigServiceImpl
  ) {
  }

  ngOnInit(): void {
  }

  doEdit() {
    this.readOnly = false;
    this.editor.readOnly.toggle().then(this.status.next);
  }

  saveData() {
    this.editor.save().then((res) => {
      const block = res.blocks;
      this.docService.updateBlock(this.docId, block, this.name).then(r => {
        this.readOnly = true;
        this.editor.readOnly.toggle();
        this.status.next(this.readOnly);
      });
      this.nameChange.next({ name: this.name, id: this.docId});
    });
  }

  setDocId(docId: number) {
    this.docId = docId;
    this.spinner.show();
    this.renderNewData(docId).then(res => {
      this.name = res.name;
      if (!this.editor) {
        if (res.blocks.length === 0) {
          this.readOnly = false;
        }
        this.editor = new EditorJS({
          readOnly: this.readOnly,
          holderId: 'editorjs',
          placeholder: '请输入回车键盘选择可输入类型',
          tools: this.getTools(),
          data: res
        });
      } else {
        if (!this.readOnly && res.blocks.length > 0) {
          this.readOnly = true;
        } else if (this.readOnly && res.blocks.length === 0) {
          console.log('reset readonly');
          this.readOnly = false;
        }
        if (res.blocks.length === 0) {
          res.blocks.push({
            data: {text: '请输入回车键盘选择可输入类型'},
            docDefineId: docId,
            id: randomString(10),
            order: 0,
            type: 'paragraph',
          });
        }
        this.editor.render(res).then(z => {
          console.log('redder e', z, this.readOnly);
          this.editor.readOnly.toggle(this.readOnly).then(r => {
          });
        });
      }
      this.status.next(this.readOnly);
      this.spinner.hide();
    });
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

  private async renderNewData(docId: number): Promise<any> {
    if (this.editor) {
      await this.editor.render({blocks: []});
    }
    const data = await Promise.all([
      this.docService.getDocDefine(docId),
      this.docService.getBlocksByDocId(docId)
    ]);
    const docData = data[0];
    docData.blocks = data[1];
    return new Promise(resolve => {
      resolve(docData);
    });
  }
}
