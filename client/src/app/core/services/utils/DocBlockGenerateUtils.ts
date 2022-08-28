import {HttpApiHistoryCache} from '../entity/HttpApi';
import {DocBlock} from '../entity/Docs';
import {randomString} from './Uuid';


function generateI18nTitle(i18nk: string, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'i18nTitle';
  block.data = {
    i18n: i18nk,
    level: 3
  };
  return block;
}


function generateTitle(text: string, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'header';
  block.data = {
    text,
    level: 3
  };
  return block;
}

function generateHttpRunner(collectionId: number, httpId: number, httpName: string, collectionName: string,
                       version: number, define: any, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'http';
  block.data = {
    collectionId,
    httpId,
    httpName,
    collectionName,
    version,
    define
  };
  return block;
}

function generateUrlBlock(waitForSave: HttpApiHistoryCache, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'url';
  let url = waitForSave.url;
  const urlArr = url.split('?');
  if (urlArr.length > 1) {
    url = urlArr[0];
  }
  block.data = {
    host: waitForSave.host,
    path: waitForSave.path,
    url
  };
  return block;
}

function generateTableForKeyValue(headers: any[], order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'table';
  const tableData = [];
  const rowHeader = [];
  rowHeader.push('Param Name');
  rowHeader.push('Param Description');
  rowHeader.push('Sample Value');
  tableData.push(rowHeader);
  headers.forEach(item => {
    const row = [];
    row.push(item.key);
    row.push(item.desc);
    row.push(item.value);
    tableData.push(row);
  });
  block.data = {
    withHeadings: true,
    content: tableData
  };
  return block;
}

function generateTableForForm(forms: any[], order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'table';
  const tableData = [];
  const rowHeader = [];
  rowHeader.push('Param Name');
  rowHeader.push('Type');
  rowHeader.push('Param Description');
  rowHeader.push('Sample Value');
  tableData.push(rowHeader);
  forms.forEach(item => {
    const row = [];
    row.push(item.key);
    row.push(item.type);
    row.push(item.desc);
    if ('file' === item.type) {
      row.push(item.fileName);
    } else {
      row.push(item.value);
    }
    tableData.push(row);
  });
  block.data = {
    withHeadings: true,
    content: tableData
  };
  return block;
}

function generateRequestType(waitForSave: HttpApiHistoryCache, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  const items = [];
  items.push(waitForSave.method);
  const method = waitForSave.method.toUpperCase();
  if (method === 'POST' || method === 'PUT') {
    const bodyType = waitForSave.bodyType.toUpperCase();
    items.push(bodyType);
    if (bodyType === 'RAW') {
      items.push(waitForSave.bodyTextType);
    }
  }
  block.type = 'list';
  block.data = {
    style: 'unordered',
    items
  };
  return block;
}

function generateJsonTree(bodyTextDoc: any, order: number, docDefineId: number) {
  console.log('zzq see json tree', bodyTextDoc);
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'jsonTree';
  block.data = {
    nodes: bodyTextDoc
  };
  return block;
}

function generateRawText(bodyText: any, lang: string, order: number, docDefineId: number) {
  const block = new DocBlock();
  block.docDefineId = docDefineId;
  block.config = {};
  block.order = order;
  block.id = randomString(10);
  block.type = 'rawText';
  block.data = {
    text: (typeof bodyText === 'string') ? bodyText : JSON.stringify(bodyText),
    lang
  };
  return block;
}

export const generateBlocks = (docDefineId: number,
                               waitForSave: HttpApiHistoryCache,
                               collectionId: number,
                               httpId: number,
                               httpName: string,
                               collectionName: string,
                               version: number
) => {
  const blocks = [];
  let order = 1;
  // generate url title
  blocks.push(generateI18nTitle('PAGES.DOCS.DOC_URL', order++, docDefineId));
  // generate url
  blocks.push(generateUrlBlock(waitForSave, order++, docDefineId));
  const headers = waitForSave.header.filter(item => item.using && item.key);
  if (Array.isArray(headers) && headers.length > 0) {
    // generate header title
    blocks.push(generateI18nTitle('PAGES.DOCS.DOC_HEADER', order++, docDefineId));
    blocks.push(generateTableForKeyValue(headers, order++, docDefineId));
  }
  // generate request type
  blocks.push(generateI18nTitle('PAGES.DOCS.REQ_TYPE', order++, docDefineId));
  // request type
  blocks.push(generateRequestType(waitForSave, order++, docDefineId));
  const queries = waitForSave.query.filter(item => item.using && item.key);
  if (Array.isArray(queries) && queries.length > 0) {
    // generate query title
    blocks.push(generateI18nTitle('PAGES.DOCS.QUERY_PARAM', order++, docDefineId));
    blocks.push(generateTableForKeyValue(queries, order++, docDefineId));
  }
  const method = waitForSave.method.toUpperCase();
  if (method === 'POST' || method === 'PUT') {
    const bodyType = waitForSave.bodyType.toLocaleLowerCase();
    if (bodyType === 'urlencoded') {
      const urlEncoded = waitForSave.bodyUrlEncoded.filter(item => item.using && item.key);
      if (Array.isArray(urlEncoded) && urlEncoded.length > 0) {
        blocks.push(generateTitle('x-www-form-urlencoded', order++, docDefineId));
        blocks.push(generateTableForKeyValue(urlEncoded, order++, docDefineId));
      }
    } else if (bodyType === 'form_data') {
      const forms = waitForSave.bodyForm.filter(item => item.using && item.key);
      if (Array.isArray(forms) && forms.length > 0) {
        blocks.push(generateI18nTitle('PAGES.DOCS.FORM_DATA', order++, docDefineId));
        // generate query url encoded
        blocks.push(generateTableForForm(forms, order++, docDefineId));
      }
    } else if (bodyType === 'raw') {
      if (waitForSave.bodyTextType === 'json' && waitForSave.bodyTextDoc && Array.isArray(waitForSave.bodyTextDoc)
        && waitForSave.bodyTextDoc.length > 1) {
        blocks.push(generateI18nTitle('PAGES.DOCS.BODY_TEXT_INFO', order++, docDefineId));
        blocks.push(generateJsonTree(waitForSave.bodyTextDoc, order++, docDefineId));
      }
      blocks.push(generateI18nTitle('PAGES.DOCS.BODY_TEXT', order++, docDefineId));
      blocks.push(generateRawText(waitForSave.bodyText, waitForSave.bodyTextType, order++, docDefineId));
    }
    if (waitForSave.respBodyTextDoc && Array.isArray(waitForSave.respBodyTextDoc)
      && waitForSave.respBodyTextDoc.length > 1) {
      blocks.push(generateI18nTitle('PAGES.DOCS.RESP_BODY_TEXT_INFO', order++, docDefineId));
      // generate return body text
      blocks.push(generateJsonTree(waitForSave.respBodyTextDoc, order++, docDefineId));
    }
  }
  blocks.push(generateI18nTitle('PAGES.DOCS.RUNNER', order++, docDefineId));
  blocks.push(generateHttpRunner(collectionId, httpId, httpName, collectionName, version, waitForSave, order++, docDefineId));
  return blocks;
};
