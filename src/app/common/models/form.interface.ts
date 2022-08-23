import { Car, Circuit } from "./results-game.interface";


export interface FirstForm {
  track:           Circuit;
  numberOfPlayers: number;
}


export interface ConfigureForm {
  state: boolean;
  data:  FirstForm;
  dataDrivers:  Car[];
}

