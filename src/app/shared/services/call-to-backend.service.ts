import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewPlayerInterface, DataPlayerInterface, Driver, ResponseUpdatePlayer } from '../models/player-interfaces';
import { Circuit, DataStartGame, ResultCircuit, ResultGame } from '../models/results-game.interface';

const REFRESH_INTERVAL = 15000;
const timer$ = timer(0, REFRESH_INTERVAL);

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


  updatePlayer(player:NewPlayerInterface):Observable<ResponseUpdatePlayer> {
    return this.http.put<ResponseUpdatePlayer>( `${this.URL}/player`, player );
  }

  deletePlayer(id:number){
    return this.http.delete( `${this.URL}/player/${id}` );
  }


  // listCircuits$ = this.getCircuitsList();
  listCircuits$ = this.http.get<ResultCircuit[]>( `${this.URL}/circuit`).pipe(
    map((resp: any) => {
      return resp['data'];
    })
  );

  // getCircuitsList(): Observable<ResultCircuit[]> {
  //   if (!this.listCircuits$) {
  //     return timer$.pipe(
  //     switchMap(_ => this.http.get<ResultCircuit[]>(`${this.URL}/circuit`)),
  //     shareReplay(1)
  //   );
  //   }
  //   return this.listCircuits$;
  // } 


  saveCircuit(circuit: Circuit): Observable<ResultCircuit> {
    return this.http.post<ResultCircuit>( `${this.URL}/circuit`, circuit);
  }

  updateCircuit(circuit: Circuit): Observable<Circuit> {
    return this.http.put<Circuit>( `${this.URL}/circuit`, circuit);
  }

  deleteCircuit(id: number) {
    return this.http.delete( `${this.URL}/circuit/${id}`);
  }



  getCars$= this.http.get( `${this.URL}/car`);


}




