import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import {RawTextDocNode} from '../../../../core/services/entity/Docs';
import {TranslateService} from '@ngx-translate/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-raw-text-doc',
  templateUrl: './raw-text-doc.component.html',
  styleUrls: ['./raw-text-doc.component.scss']
})
export class RawTextDocComponent implements OnInit, OnChanges {
  @Input() data: RawTextDocNode;
  @Input() readonly = false;
  editorOptions = {
    theme: 'vs-light', fontSize: 12, glance: false, minimap: {enabled: false},
    lineDecorationsWidth: 1, language: 'json', readOnly: false,
  };
  editor: MonacoStandaloneCodeEditor;

  constructor(
    private trans: TranslateService,
    private snackBar: MatSnackBar,
    private clipboard: Clipboard) {
  }

  @Input() get getData(): any {
    return this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('set val', changes);
    if (changes.readonly) {
      this.editorOptions = {...this.editorOptions, readOnly: this.readonly};
    }
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = new RawTextDocNode();
      this.data.text = '{}';
      this.data.lang = 'json';
    }
  }

  initEditor(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor;
  }

  toggleSearch() {
    if (this.editor) {
      this.editor.focus();
      this.editor.getAction('actions.find').run();
    }
  }

  onBodyTypeChange(newType: any): void {
    this.editorOptions = {...this.editorOptions, language: newType};
  }

  doCopy() {
    if (this.clipboard.copy(this.data.text)) {
      this.tip('MESSAGE.COPY_SUCCESS');
    }
  }

  handleEvent(event: any): any {
    if (event.keyCode === 13) {
      event.cancelBubble = true;
    }
  }

  beautify() {
    this.data.text = JSON.stringify(JSON.parse(this.data.text), null, '\t');
  }

  private tip(str: string){
    this.trans.get([str,'MESSAGE.I_KNOW']).subscribe(msg => {
      this.snackBar.open(msg[str], msg['MESSAGE.I_KNOW'], {
        duration: 2 * 1000,
      });
    });
  }
}
