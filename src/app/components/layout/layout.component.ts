import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  dataMenuGame$ = this.gameService.dataMenuGame$;

  constructor(private sidebarService: NbSidebarService, private gameService: GameService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }




}
