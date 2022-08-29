export interface TableNode<T> {
  data: T;
  children?: TableNode<T>[];
  expanded?: boolean;
}

export interface DataTablePlayer {
  name: string;
  id: any;
}
