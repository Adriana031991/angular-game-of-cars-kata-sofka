import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Car, Circuit } from 'src/app/common/models/results-game.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';
import { FacadeService } from '../../services/facade.service';
import { RaceDialogComponent } from '../race-dialog/race-dialog.component';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ConfigurationsComponent implements OnInit, OnDestroy {
  destroyCallToServer$ = new Subject<void>();
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
      this.numberOfPlayers = data?.numberOfPlayers;
      this.track = data?.track;
      this.gameStarted=state;
      this.changeDetection.detectChanges();
      // console.log('shared first data form', result)
    })


  constructor(
    private callBackend: CallToBackendService,
    private sharedService: SharedService,
    private facadeService: FacadeService,
    private changeDetection: ChangeDetectorRef) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

    this.destroyCallToServer$.next();
    this.destroyCallToServer$.complete();
    this.destroyConfigure$.next();
    this.destroyConfigure$.complete();

  }

  disableButton() {
    // console.log('test', this.drivers.length, 'test', this.numberOfPlayers)
    return this.drivers.length !== this.numberOfPlayers
  }

  startGame(){

    // this.facadeService.navigateToRr();
    // console.group('drivers', this.drivers,
    // 'number', this.numberOfPlayers, 'track', this.track)


    let circuitCarsDto = {
      circuit: this.track,
      cars: [...this.drivers]
    }
    // console.log('que pasa game', circuitCarsDto)

    this.callBackend.startGame(circuitCarsDto).
    pipe(takeUntil(this.destroyCallToServer$)).subscribe(result => {
      this.sharedService.sharedResultGame(result)
    });

    this.facadeService.modalDialog('The race has finished', RaceDialogComponent);

  }



}
