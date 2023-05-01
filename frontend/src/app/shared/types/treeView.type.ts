export type treeNode = {
    name: string;
    disabled?: boolean;
    path:string;
    children?: treeNode[];
  }