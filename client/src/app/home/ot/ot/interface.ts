export interface IJot {
  apply: (json: any, actions: any[]) => void;

  transformX: (leftOp: any[], rightOp: any[]) => [any[], any[]];

  transform: (op: any[], otherOp: any[], type: 'left' | 'right') => any[];

  invert: (op: any[]) => any[];

  compose: (op: any[], otherOp: any[]) => any[];
}
