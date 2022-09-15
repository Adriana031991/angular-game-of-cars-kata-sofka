import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Circuit, ResultGame } from '../models/results-game.interface';
import { shareDataConfig } from '../models/shared.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private dataMenuGameSubject = new BehaviorSubject({});
  dataMenuGame$ = this.dataMenuGameSubject.asObservable();

  private resultGameSubject = new BehaviorSubject({});
  resultGame$ = this.resultGameSubject.asObservable();

  private configureFormSubject = new BehaviorSubject({});
  configureFormSubject$ = this.configureFormSubject.asObservable();


  sharedResultGame(item:ResultGame) {
    this.resultGameSubject.next(item);
  }

  sharedMenuGame(item:string) {
    this.dataMenuGameSubject.next(item);
  }

  SharedConfigureForm(data:shareDataConfig) {
    this.configureFormSubject.next(data);
  }



}
