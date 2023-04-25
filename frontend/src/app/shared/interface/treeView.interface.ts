export interface treeNode {
    name: string;
    disabled?: boolean;
    path:string;
    children?: treeNode[];
  }