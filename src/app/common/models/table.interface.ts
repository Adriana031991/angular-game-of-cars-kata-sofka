export interface TableNode<T> {
  data: T;
  children?: TableNode<T>[];
  expanded?: boolean;
}

export interface DataTable {
  name: string;
  id: any;
}
