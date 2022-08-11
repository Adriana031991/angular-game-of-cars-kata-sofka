import { Car, Circuit } from "./results-game.interface";

export interface FirstConfigureForm {
  state: boolean;
  data:  FirstForm;
}

export interface FirstForm {
  track:           Circuit;
  numberOfPlayers: number;
}

export interface SecondConfigureForm {
  state: boolean;
  data:  Car[];
}
