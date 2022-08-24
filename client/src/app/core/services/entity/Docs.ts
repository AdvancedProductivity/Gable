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

export class DocBlockInElec {
  i: number;
  id: string;
  docDefineId: number;
  order: number;
  type: string;
  data: string;
  config: string;
}

export const tansBlockToElec = (block: DocBlock) => {
  const d = new DocBlockInElec();
  d.data = JSON.stringify(block.data);
  if (block.config) {
    d.config = JSON.stringify(block.config);
  }else{
    d.config = '';
  }
  d.i = block.i;
  d.id = block.id;
  d.type = block.type;
  d.docDefineId = block.docDefineId;
  d.order = block.order;
  return d;
};

export const tansBlockToWebData = (block: DocBlockInElec) => {
  const d = new DocBlock();
  d.data = JSON.parse(block.data);
  if (block.config) {
    d.config = JSON.parse(block.config);
  }
  d.i = block.i;
  d.id = block.id;
  d.type = block.type;
  d.docDefineId = block.docDefineId;
  d.order = block.order;
  return d;
};
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

export class DocJsonTableNode{
  id: string;
  canDelete: boolean;
  canEditName: boolean;
  name: string;
  type: string;
  desc: string;
  sample: string;
  location: string[];

  constructor() {
    this.id = randomString(5);
    this.canDelete = true;
    this.canEditName = true;
  }
}
export class I18nDocNode{
  i18n: string;
  level: number;
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
  const root= new DocJsonTableNode();
  root.canDelete = false;
  root.type = 'object';
  root.location = [root.id];
  root.canEditName = false;
  root.name = 'root';
  return root;
}
