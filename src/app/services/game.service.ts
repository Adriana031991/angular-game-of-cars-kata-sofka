import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultGame } from '../common/models/results-game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dataMenuGameSubject = new BehaviorSubject({});
  dataMenuGame$ = this.dataMenuGameSubject.asObservable();

  private resultGameSubject = new BehaviorSubject({});
  resultGame$ = this.resultGameSubject.asObservable();

  constructor() { }

  sharedResultGame(item:ResultGame) {
    this.resultGameSubject.next(item);
  }

  sharedMenuGame(item:any) {
    console.log('service', item)
    this.dataMenuGameSubject.next(item);
  }


}
