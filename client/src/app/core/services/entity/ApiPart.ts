export class ApiKeyValue {
  using: boolean;
  key: string;
  value: string;
  desc: string;
}

export class ApiKeyValueChangeEvent {
  field: string;
  data: ApiKeyValue[];
}
