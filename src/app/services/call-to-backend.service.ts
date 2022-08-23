import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewPlayerInterface, DataPlayerInterface } from '../common/models/player-interfaces';
import { Circuit, DataStartGame, ResultCircuit, ResultGame } from '../common/models/results-game.interface';


@Injectable({
  providedIn: 'root'
})
export class CallToBackendService {

  URL: string = environment.base_url;

  constructor( private http: HttpClient) { }


  startGame(dataGame:DataStartGame):Observable<ResultGame> {
    return this.http.post<ResultGame>( `${this.URL}/game/start-game`, dataGame);
  }

  addNewPlayer(newPlayer:NewPlayerInterface):Observable<DataPlayerInterface> {
    return this.http.post<DataPlayerInterface>( `${this.URL}/player`, newPlayer );
  }


  updatePlayer(player:NewPlayerInterface):Observable<DataPlayerInterface> {
    return this.http.put<DataPlayerInterface>( `${this.URL}/player`, player );
  }

  deletePlayer(id:number):Observable<any>{
    return this.http.delete<any>( `${this.URL}/player/${id}` );

  }


  listCircuits$ = this.http.get<ResultCircuit[]>( `${this.URL}/circuit`);

  saveCircuit(circuit: any) {
    return this.http.post( `${this.URL}/circuit`, circuit);
  }



  getCars$= this.http.get( `${this.URL}/car`);


}




