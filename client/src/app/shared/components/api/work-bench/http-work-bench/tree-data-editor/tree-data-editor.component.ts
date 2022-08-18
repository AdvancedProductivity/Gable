import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {DocJsonNode, rootJsonDoc} from '../../../../../../core/services/entity/Docs';
import {debounceTime, Subject} from 'rxjs';

@Component({
  selector: 'app-tree-data-editor',
  templateUrl: './tree-data-editor.component.html',
  styleUrls: ['./tree-data-editor.component.scss']
})
export class TreeDataEditorComponent implements OnInit, OnChanges {
  @Output() chang = new EventEmitter<DocJsonNode>();
  @Input() da: DocJsonNode[];
  @Input() readonly = false;
  @Input() isScroll = true;
  treeSubject = new Subject<void>();
  root: DocJsonNode;
  treeControl = new NestedTreeControl<DocJsonNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DocJsonNode>();

  constructor() {
    this.dataSource.data = [];
  }

  @Input() get getData(): any {
    return this.root;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.da && changes.da.currentValue) {
      this.root = changes.da.currentValue;
      setTimeout(() => {
        const arr = [];
        arr.push(this.root);
        this.dataSource.data = [...[]];
        this.dataSource.data = [...arr];
        this.expandAll(this.dataSource.data);
      }, 200);
    }
  }

  hasChild = (_: number, node: DocJsonNode) => (!!node.children && node.children.length > 0) || (node.name === 'root' && !node.canEditName);

  ngOnInit(): void {
    if (!this.root) {
      this.root = rootJsonDoc();
      const arr = [];
      arr.push(this.root);
      this.dataSource.data = [...[]];
      this.dataSource.data = [...arr];
    }
    this.treeSubject.pipe(debounceTime(2000))
      .subscribe(res => {
        this.chang.next(this.root);
      });
  }

  dataChange() {
    this.treeSubject.next();
  }

  setDocData(bodyTextDoc: any) {
    if (bodyTextDoc && bodyTextDoc.name === 'root') {
      this.root = bodyTextDoc;
      const arr = [];
      arr.push(this.root);
      this.dataSource.data = [...[]];
      this.dataSource.data = [...arr];
      this.expandAll(this.dataSource.data);
    }
  }


  gen(data: any): void {
    this.traverse(data, this.process, this.root.children, this.root.level);
    const arr = [];
    arr.push(this.root);
    this.dataSource.data = [...[]];
    this.dataSource.data = [...arr];
    this.dataChange();
  }

  readOnly() {
    this.readonly = !this.readonly;
  }

  delete(id): void {
    console.log('want to delete ', id);
    this.traverseForDelete(this.root, id);

    const arr = [];
    arr.push(this.root);
    this.dataSource.data = [...[]];
    this.dataSource.data = [...arr];
    this.dataChange();
  }

  add(id): void {
    this.traverseForAdd(this.root, id);

    const arr = [];
    arr.push(this.root);
    this.dataSource.data = [...[]];
    this.dataSource.data = [...arr];
    this.dataChange();
  }

  private traverseForAdd(o: DocJsonNode, parentId: string) {
    if (o.id === parentId) {
      const doc = new DocJsonNode();
      doc.children = [];
      doc.name = '';
      doc.level = o.level + 1;
      doc.type = 'string';
      o.children.push(doc);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < o.children.length; i++) {
      const child = o.children[i];
      if (child.type === 'object' || child.type === 'array') {
        this.traverseForAdd(child, parentId);
      }
    }
  }

  private traverseForDelete(o: DocJsonNode, deleteId: string) {
    let index = -1;
    for (let i = 0; i < o.children.length; i++) {
      const child = o.children[i];
      if (child.id === deleteId) {
        index = i;
        break;
      }
      if (child.type === 'object' || child.type === 'array') {
        this.traverseForDelete(child, deleteId);
      }
    }
    if (index !== -1) {
      o.children.splice(index, 1);
    }
  }

  private process = (key, value, docs: DocJsonNode[], level: number): number => {
    let index = -1;
    for (let i = 0; i < docs.length; i++) {
      if (docs[i].name === key) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      const a = new DocJsonNode();
      if (Array.isArray(value)) {
        a.type = 'array';
      } else {
        a.type = typeof value;
        if (a.type !== 'object') {
          a.sample = value;
        }
      }
      a.name = key;
      a.children = [];
      a.level = level;
      docs.push(a);
      index = docs.length - 1;
    }
    return index;
  };

  private traverse(o, func, docs: DocJsonNode[], curLevel: number) {
    const keySet = Object.keys(o);
    for (const i of keySet) {
      const index = func.apply(this, [i, o[i], docs, curLevel + 1]);
      if (o[i] !== null && Array.isArray(o[i]) && o[i].length > 0) {
        if (!docs[index].children[0]) {
          this.generateItem(o, i, curLevel, docs, index, func);
        } else if (docs[index].children[0].name !== 'item' && !docs[index].children[0].canEditName) {
          this.generateItem(o, i, curLevel, docs, index, func);
        } else if (docs[index].children[0].name === 'item' && !docs[index].children[0].canEditName) {
          this.traverse(o[i][0], func, docs[index].children[0].children, curLevel + 2);
        }
      } else if (o[i] !== null && typeof (o[i]) === 'object') {
        //going one step down in the object tree!!
        this.traverse(o[i], func, docs[index].children, curLevel + 1);
      }
    }
  }

  private generateItem(o: any, i: string, curLevel: number, docs: DocJsonNode[], index: number, func) {
    if (typeof o[i][0] === 'object') {
      const a = new DocJsonNode();
      a.type = 'object';
      a.name = 'item';
      a.canEditName = false;
      a.level = curLevel + 2;
      a.children = [];
      docs[index].children.push(a);
      this.traverse(o[i][0], func, a.children, a.level);
    } else {
      const a = new DocJsonNode();
      a.type = typeof o[i][0];
      a.sample = o[i][0];
      a.level = curLevel + 2;
      a.name = 'item';
      a.canEditName = false;
      a.children = [];
      docs[index].children.push(a);
    }
  }

  private expandAll(data: DocJsonNode[]) {
    if (Array.isArray(data) && data.length > 0) {
      for (const datum of data) {
        this.treeControl.toggle(datum);
        this.expandAll(datum.children);
      }
    }
  }
}
