import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit, OnChanges {
  @Output()
  expandPanel = new EventEmitter();
  @Output()
  closePanel = new EventEmitter();
  @Input()
  width = 32;
  isCollapsed = true;
  cWidth = 80;
  showBtn = false;
  subject = new Subject<number>();
  editorOptions = {theme: 'vs-light', language: 'javascript'};
  code = 'function x() {\nconsole.log("Hello world!");\n}';

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.width) {
      if (changes.width.firstChange) {
        return;
      }
      this.subject.next(changes.width.currentValue);
    }
  }

  ngOnInit(): void {
    this.subject.pipe(debounceTime(10)).subscribe((e: number) => {
        console.log('zzq see resize');
        this.width = e;
        this.showBtn = this.width > 70;
      }
    );
  }

  onSow(): void {
    if (this.width > 200) {
      return;
    }
    this.expandPanel.emit({});
  }

  onClose(): void {
    this.closePanel.emit({});
  }

}
