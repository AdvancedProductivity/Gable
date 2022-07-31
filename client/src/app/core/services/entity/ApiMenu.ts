export interface ApiMenuCollection{
  id?: number;
  name: string;
  apiCount?: number;
  children?: ApiMenuItem[];
}

export interface ApiMenuItem extends ApiMenuCollection{
  tag: string;
  version: number;
  type: string;
  collectionId: number;
  defineId: number;
}
