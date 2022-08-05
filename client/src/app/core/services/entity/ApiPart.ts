export class ApiKeyValue {
  using: boolean;
  key: string;
  value: string;
  desc: string;
}

export class ApiFormKeyValue extends ApiKeyValue{
  type: string;
  fileName?: string;
  fileId?: number;
}

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
