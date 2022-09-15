import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RoutesFacadeService } from '../../../shared/services/routes-facade.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.scss']
})
export class PodiumComponent implements OnInit {

  winners: string[] = [];
  resultsGame$ = this.gameService.resultGame$.pipe(map((resp:any) => {return resp['data'];}));

  constructor(
    private facadeService: RoutesFacadeService,
    private gameService: SharedService) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.facadeService.navigateToNewGame();
  }

}
