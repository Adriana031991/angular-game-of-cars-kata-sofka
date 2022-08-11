import { ChangeDetectionStrategy, Component,  EventEmitter,  OnDestroy,  OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { RaceDialogComponent } from './race-dialog/race-dialog.component';

import { map, Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { FirstForm } from 'src/app/common/models/form.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<void>();
  gameStarted = false;

  dataExist: boolean = false;
  gameForm!: FirstForm;
  players= [];

  firstConfigureForm$ = this.sharedService.firstConfigureForm$
    .subscribe((data:any) => {
      this.dataExist = data.state;
      this.gameForm = data.data;
    })

  secondConfigureForm$ = this.sharedService.secondConfigureForm$
    .subscribe((data:any) => {
      this.gameStarted = data.state;
      this.players = data.data;
    })


  constructor(
    private dialogService: NbDialogService,
    private callBackend: CallToBackendService,
    private sharedService: SharedService) {

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

  startGame(){

    let circuitCarsDto = {
      circuit: this.gameForm.track,
      cars: [...this.players]
    }
    console.log('circuitCarsDto', circuitCarsDto)

    this.callBackend.startGame(circuitCarsDto).
    pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.sharedService.sharedResultGame(result)
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
