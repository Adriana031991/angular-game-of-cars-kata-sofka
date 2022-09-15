

export interface NewPlayerInterface {
  idDto?: number;
  nameDto: string;

}

export interface DataPlayerInterface {
  data: DataPlayer

}

export interface DataPlayer {
  driver: Driver,
  id: number,
  nameCar: string,
  routeMts: number,
  winner: boolean,
}

export interface Driver {
  id: number, name: string
}

export interface ResponseUpdatePlayer {
  data: Driver
}

