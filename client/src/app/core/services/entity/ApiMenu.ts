/**
 * indexDb define record the collection menu
 * */
export interface ApiMenuCollection{
  id?: number;
  name: string;
  type: string;
  apiCount?: number;
  children?: ApiMenuItem[];
}
/**
 * indexDb define record the API Item. the leaf in the menu tree
 * */
export interface ApiMenuItem extends ApiMenuCollection{
  tag: string;
  version: number;
  type: string;
  collectionId: number;
  defineId: number;
}

/**
 * indexDb define. record the opening tabs in the nav bar
 * */
export interface OpeningNavTab{
  id?: number;
  collectionId?: number;
  tabId: string;
  name: string;
  type: string;
  tag: string;
  opening: boolean;
  isCursorIn?: boolean;
}

/**
 * indexDb define. record the api define as json
 * */
export interface ApiDefine {
  id?: number;
  type: string;
  define: string;
}

export interface DashBoardShowingMetadata {
  id: number;
  isEditing: boolean;
  type: string;
}

export interface MenuEvent{
  name: string;
  data: any;
}

export interface MenuSelectedEvent {
  fromMenu: boolean;
  isCollection: boolean;
  apiId: number;
  collectionId: number;
}

/** Flat node with expandable and level information */
export interface MatApiFlatNode {
  id: number;
  collectionId: number;
  expandable: boolean;
  name: string;
  visible: boolean;
  level: number;
}
