import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResultGame } from '../common/models/results-game';

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {

  private selectedItemSubject = new BehaviorSubject({});
  selectedItem$ = this.selectedItemSubject.asObservable();

  constructor() { }

  sharedSelectedItem(item:ResultGame) {
    // console.log(item, 'item selected', JSON.stringify(item));
    this.selectedItemSubject.next(item);
  }
}
