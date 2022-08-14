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
  name: string;
  type: string;
  desc: string;
  sample: string;
  children?: DocJsonNode[];
}
