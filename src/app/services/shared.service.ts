import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirstConfigureForm, SecondConfigureForm } from '../common/models/form.interface';
import { ResultGame } from '../common/models/results-game.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private dataMenuGameSubject = new BehaviorSubject({});
  dataMenuGame$ = this.dataMenuGameSubject.asObservable();

  private resultGameSubject = new BehaviorSubject({});
  resultGame$ = this.resultGameSubject.asObservable();

  private firstConfigureFormSubject = new BehaviorSubject({});
  firstConfigureForm$ = this.firstConfigureFormSubject.asObservable();

  private secondConfigureFormSubject = new BehaviorSubject({});
  secondConfigureForm$ = this.secondConfigureFormSubject.asObservable();

  constructor() { }

  sharedResultGame(item:ResultGame) {
    this.resultGameSubject.next(item);
  }

  sharedMenuGame(item:string) {
    console.log('service', item)
    this.dataMenuGameSubject.next(item);
  }

  SharedFirstConfigureForm(data:FirstConfigureForm) {
    this.firstConfigureFormSubject.next(data);
  }

  SharedSecondConfigureForm(data:SecondConfigureForm) {
    this.secondConfigureFormSubject.next(data);
  }

}
