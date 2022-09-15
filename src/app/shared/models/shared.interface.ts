import { DataPlayer } from "./player-interfaces"

export interface shareDataConfig {
  state?: boolean,
  data?: configForm,
  dataDrivers?: DataPlayer[]
}

export interface configForm {
  track: string,
  numberOfPlayers: number,
  nameOfPlayer: string
}
