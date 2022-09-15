import { Circuit, Lane } from "./results-game.interface";

export interface TableCircuits<T> {
  data: Circuit;
  children?: TableCircuits<Lane>[];
  expanded?: boolean;
}
export interface TableNode<T> {
  data: T;
  children?: TableNode<T>[];
  expanded?: boolean;
}

export interface DataTablePlayer {
  name: string;
  id: any;
}
