export interface ApiMenuCollection{
  id?: number;
  name: string;
  type: string;
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

export interface OpeningNavTab{
  tabId: string;
  id: number;
  name: string;
  tag: string;
  type: string;
  opening: boolean;
}
