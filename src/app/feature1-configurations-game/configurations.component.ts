import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Car, Circuit } from 'src/app/shared/models/results-game.interface';
import { ConfigurationsFacadeService } from './services/configurations-facade.service';

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
  track!: Circuit;
  drivers: Car[] = [];


  configureForm$ = this.configService.configureForm$
    .pipe(takeUntil(this.destroyConfigure$))
    .subscribe((result: any) => {

      const { state, data, dataDrivers } = result;
      this.drivers = dataDrivers;
      this.numberOfPlayers = data?.numberOfPlayers;
      this.track = data?.track;
      this.gameStarted = state;
      this.changeDetection.detectChanges();
    })


  constructor(
    private configService: ConfigurationsFacadeService,
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
    return this.drivers.length !== this.numberOfPlayers || this.drivers.length === 0
  }

  startGame() {
      let circuitCarsDto = {
        circuit: this.track,
        cars: [...this.drivers]
      }
this.configService.startGame(circuitCarsDto);
  }





}
