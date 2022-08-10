import { ChangeDetectionStrategy, Component,  EventEmitter,  OnDestroy,  OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { RaceDialogComponent } from './race-dialog/race-dialog.component';

import { Subject, takeUntil } from 'rxjs';
import { gameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  gameStarted = false;

  dataExist:boolean = false;
  gameForm: any;
  players= [];

  constructor(
    private dialogService: NbDialogService,
    private callBackend: CallToBackendService,
    private gameService: gameService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

  disableButton() {
    return this.players.length !== this.gameForm.numberOfPlayers
  }

  dataOfTrack(event:any) {
    this.dataExist = event.state;
    this.gameForm = event.data;
  }

  dataOfPlayer(event:any) {
    this.players = event.data;
    this.gameStarted = event.gameStarted;
  }


  startGame(){

    let circuitCarsDto = {
      circuit: this.gameForm.track,
      cars: [...this.players]
    }

    this.callBackend.startGame(circuitCarsDto).pipe(takeUntil(this.destroy$)).subscribe(result => {
      console.log('res', result, JSON.stringify(result))
      this.gameService.sharedResultGame(result)
    });

    this.modalDialog();
  }

  private modalDialog() {
    this.dialogService.open(RaceDialogComponent, {
      context: {
        title: 'The race has finished',
      },
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }

}
