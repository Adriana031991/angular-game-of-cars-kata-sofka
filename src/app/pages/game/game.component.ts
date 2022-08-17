import { ChangeDetectionStrategy, Component,  OnDestroy,  OnInit } from '@angular/core';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

import { Subject, takeUntil } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { FacadeService } from '../services/facade.service';
import { Car, Circuit } from 'src/app/common/models/results-game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  destroyConfigure$ = new Subject<void>();

  gameStarted: boolean = false;
  numberOfPlayers: number = 0;
  track!:Circuit;
  drivers: Car[]= [];


  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(takeUntil(this.destroyConfigure$))
    .subscribe( (result:any) => {

      const {state,data,dataDrivers} = result;
      this.drivers = dataDrivers;
      this.numberOfPlayers = data.numberOfPlayers;
      this.track = data.track;
      this.gameStarted=state;

      console.log('shared first data form', result)
    })


  constructor(
    private callBackend: CallToBackendService,
    private sharedService: SharedService,
    private facadeService: FacadeService,) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
    this.destroyConfigure$.next();
    this.destroyConfigure$.complete();

  }

  disableButton() {
    console.log('test', this.drivers.length, 'test', this.numberOfPlayers)
    return this.drivers.length !== this.numberOfPlayers
  }

  startGame(){
    console.group('drivers', this.drivers,
    'number', this.numberOfPlayers, 'track', this.track)


    let circuitCarsDto = {
      circuit: this.track,
      cars: [...this.drivers]
    }
    console.log('que pasa game', circuitCarsDto)

    this.callBackend.startGame(circuitCarsDto).
    pipe(takeUntil(this.destroy$)).subscribe(result => {
      this.sharedService.sharedResultGame(result)
    });

    this.facadeService.modalDialog('The race has finished');

  }



}
