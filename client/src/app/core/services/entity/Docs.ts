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
  dateCreated: number;
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
