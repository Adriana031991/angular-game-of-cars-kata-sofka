export interface DataStartGame {
  circuit: Circuit;
  cars:    Car[];
}

export interface ResultGame {
  data: Results;
}

export interface ResultCircuit {
  data: Circuit;
}


export interface Results {
  id:     number;
  game:   Game;
  first:  Player;
  second: Player;
  third:  Player;
}

export interface Player {
  id:   number;
  name: string;
}

export interface Game {
  id:      number;
  name:    null;
  circuit: Circuit;
}

export interface Circuit {
  id?:         number;
  name:       string | null;
  lanes:      Lane[];
  kilometers: number;
}

export interface Lane {
  idLane?: number;
  name:   string;
  car?:    Car| null;
}

export interface Car {
  id:       number;
  nameCar:  string;
  driver:   Player;
  routeMts: number;
  winner:   boolean;
}

