import {randomString} from '../utils/Uuid';

export class HttpDocBlockData{
  collectionId: number;
  httpId: number;
  collectionName: string;
  httpName: string;
  define: any;
  version: number;
}
export class Doc{
  id?: number;
  name: string;
  dateCreated: number;
}
export class DocMenu{
  id?: number;
  docId: number;
  level: number;
  itemCount: number;
  parentId: number;
  name: string;
  apiKey: string;
  dateCreated: number;
}
export class DocDefine{
  id?: number;
  time: number;
  name: string;
  blocks?: any[];
  version: string;
}

export class DocBlock {
  i: number;
  id: string;
  docDefineId: number;
  order: number;
  type: string;
  data: any;
  config: any;
}
/** Flat node with expandable and level information */
export class DocMenuDynamicFlatNode {
  constructor(
    public id: number,
    public name: string,
    public itemCount: number,
    public level = 1,
    public expandable?: boolean,
    public isLoading?: boolean,
  ) {
  }
}

export class DocJsonNode{
  id: string;
  canDelete: boolean;
  canEditName: boolean;
  level: number;
  name: string;
  type: string;
  desc: string;
  sample: string;
  children?: DocJsonNode[];

  constructor() {
    this.id = randomString(5);
    this.canDelete = true;
    this.canEditName = true;
  }
}
export class UrlDocNode{
  url: string;
  host: string;
  path: string;
}
export class RawTextDocNode{
  lang: string;
  text: string;
}
export const rootJsonDoc = () => {
  const root= new DocJsonNode();
  root.canDelete = false;
  root.type = 'object';
  root.children = [];
  root.canEditName = false;
  root.level = 0;
  root.name = 'root';
  return root;
}
