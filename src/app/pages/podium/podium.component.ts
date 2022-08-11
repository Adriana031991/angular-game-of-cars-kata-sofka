import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { FacadeService } from '../services/facade.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  winners: string[] = [];
  resultsGame$ = this.gameService.resultGame$.pipe(map((resp:any) => {return resp['data'];}));

  constructor(
    private facadeService: FacadeService,
    private gameService: SharedService) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.facadeService.navigateToNewGame();
  }

}
