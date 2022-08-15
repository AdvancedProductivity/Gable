import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {DocJsonNode} from '../../../../../../core/services/entity/Docs';

@Component({
  selector: 'app-tree-data-editor',
  templateUrl: './tree-data-editor.component.html',
  styleUrls: ['./tree-data-editor.component.scss']
})
export class TreeDataEditorComponent implements OnInit {
  editorOptions = {theme: 'vs-light', language: 'json'};
  readonly = false;
  root: DocJsonNode;
  treeControl = new NestedTreeControl<DocJsonNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<DocJsonNode>();

  constructor() {
    this.dataSource.data = [];
  }

  hasChild = (_: number, node: DocJsonNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.root = new DocJsonNode();
    this.root.canDelete = false;
    this.root.type = 'object';
    this.root.children = [];
    this.root.canEditName = false;
    this.root.name = 'root';
  }


  gen(data: any): void {
    this.traverse(data, this.process, this.root.children);
    console.log('zzq see ', this.root);
    const arr = [];
    arr.push(this.root);
    this.dataSource.data = [...[]];
    this.dataSource.data = [...arr];
    setTimeout(() => {
    }, 100);
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
  }

  add(id): void {
    this.traverseForAdd(this.root, id);

    const arr = [];
    arr.push(this.root);
    this.dataSource.data = [...[]];
    this.dataSource.data = [...arr];
  }

  private traverseForAdd(o: DocJsonNode, parentId: string) {
    if (o.id === parentId) {
      const doc = new DocJsonNode();
      doc.children = [];
      doc.name = '';
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

  //called with every property and its value
  private process(key, value, docs: DocJsonNode[]) {
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
      }else {
        a.type = typeof value;
        if (a.type !== 'object') {
          a.sample = value;
        }
      }
      a.name = key;
      a.children = [];
      docs.push(a);
      index = docs.length - 1;
    }
    return index;
  }

  private traverse(o, func, docs: DocJsonNode[]) {
    // eslint-disable-next-line guard-for-in
    for (const i in o) {
      const index = func.apply(this, [i, o[i], docs]);
      if (o[i] !== null && Array.isArray(o[i]) && o[i].length > 0) {
        if (!docs[index].children[0] || (docs[index].children[0].name !== 'item' && !docs[index].children[0].canEditName)) {
          if (typeof o[i][0] === 'object') {
            const a = new DocJsonNode();
            a.type = 'object';
            a.name = 'item';
            a.canEditName = false;
            a.children = [];
            docs[index].children.push(a);
            this.traverse(o[i][0], func, a.children);
          } else {
            const a = new DocJsonNode();
            a.type = typeof o[i][0];
            a.sample = o[i][0];
            a.name = 'item';
            a.canEditName = false;
            a.children = [];
            docs[index].children.push(a);
          }
        }
      } else if (o[i] !== null && typeof (o[i]) === 'object') {
        //going one step down in the object tree!!
        this.traverse(o[i], func, docs[index].children);
      }
    }
  }
}
