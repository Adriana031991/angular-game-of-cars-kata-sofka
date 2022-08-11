import { Component } from '@angular/core';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

constructor(private facade: FacadeService) {}

goToNewGame() {
  this.facade.navigateToNewGame()
}

}
