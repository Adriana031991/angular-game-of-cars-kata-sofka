import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FacadeService } from 'src/app/services/facade.service';
import { gameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  winners: string[] = [];
  resultsGame$ = this.gameService.resultGame$.pipe(map((resp:any) => {return resp['data'];}));

  constructor( private facadeService: FacadeService, private gameService: gameService) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.facadeService.navigateToNewGame();
  }

}
