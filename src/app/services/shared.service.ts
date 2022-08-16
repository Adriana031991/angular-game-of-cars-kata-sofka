import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultGame } from '../common/models/results-game.interface';

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


  constructor() { }

  sharedResultGame(item:ResultGame) {
    this.resultGameSubject.next(item);
  }

  sharedMenuGame(item:string) {
    console.log('service', item)
    this.dataMenuGameSubject.next(item);
  }

  SharedConfigureForm(data:any) {
    this.configureFormSubject.next(data);
  }


}
