export class ApiKeyValue {
  using: boolean;
  key: string;
  value: string;
  desc: string;
}

export const getCommonKeyValue = () => {
  const d = new ApiKeyValue();
  d.key = '';
  d.value = '';
  d.desc = '';
  d.using = true;
  return d;
};

export const parserKeyValue = (key: string, value: string) => {
  const d = new ApiKeyValue();
  d.key = key;
  if (!value) {
    d.value = '';
  }else {
    d.value = value;
  }
  d.desc = '';
  d.using = true;
  return d;
};

export class ApiFormKeyValue extends ApiKeyValue{
  type: string;
  fileName?: string;
  filePath?: string;
  fileUrl?: string;
  fileId?: string;
}

export const getCommonFormKeyValue = () => {
  const d = new ApiFormKeyValue();
  d.type = 'text';
  d.key = '';
  d.fileName = '';
  d.value = '';
  d.desc = '';
  d.using = true;
  return d;
};

export class ApiKeyValueChangeEvent {
  field: string;
  data: ApiKeyValue[];
}

export class ApiFormKeyValueChangeEvent {
  field: string;
  data: ApiFormKeyValue[];
}

export class GraphQlPart{
  query: string;
  data: string;
}

export class GraphQlPartChangeEvent {
  type: string;
  content: string;
}

export class HttpComponentHotDataUpdateEvent {
  action: string;
  data: any;
}

export class FileUploadInfo{
  id: string;
  name: string;
  path: string;
  url: string;
}
