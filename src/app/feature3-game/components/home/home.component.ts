import { Component } from '@angular/core';
import { RoutesFacadeService } from '../../../shared/services/routes-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  {

constructor(private facade: RoutesFacadeService) {}

goToNewGame() {
  this.facade.navigateToNewGame()
}

}
