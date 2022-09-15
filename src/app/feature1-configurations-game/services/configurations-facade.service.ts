import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { RaceDialogComponent } from 'src/app/feature3-game/components/race-dialog/race-dialog.component';
import { NewPlayer } from 'src/app/shared/classes/new-player';
import { DataPlayer } from 'src/app/shared/models/player-interfaces';
import { shareDataConfig } from 'src/app/shared/models/shared.interface';
import { CallToBackendService, MessagesService, SharedService } from 'src/app/shared/services';
import { CreateCircuitComponent } from '../pages/create-circuit/create-circuit.component';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsFacadeService implements OnDestroy {

  destroyCallToServer$ = new Subject<void>();

  configureForm$ = this.sharedService.configureFormSubject$
  listOfTracks$ = this.callBackend.listCircuits$

  players: DataPlayer[] = [];


  constructor(
    private callBackend: CallToBackendService,
    private sharedService: SharedService,
    private messageFacade: MessagesService,
    

  ) { }


  ngOnDestroy(): void {

    this.destroyCallToServer$.next();
    this.destroyCallToServer$.complete();

  }

  startGame(body: any) {

    console.log('problem1', body)
    this.callBackend.startGame(body).
      pipe(takeUntil(this.destroyCallToServer$)).subscribe({
        next: result => {
          this.sharedService.sharedResultGame(result)

        },
        error: (err) => {
          this.messageFacade.errorMessage(err);

        }
      })

    this.messageFacade.modalDialog('The race has finished', RaceDialogComponent);

  }

  enterDataCircuit(data:any) {
    this.callBackend
      .saveCircuit(data)
      .pipe(takeUntil(this.destroyCallToServer$))
      .subscribe({
        next:
          (resp) => {
            this.messageFacade.toastr('success', `Circuit ${resp.data.name} created`);
          },
          error: (err) => {
            this.messageFacade.errorMessage(err);
          },
      });
  }



  createCircuit() {
    this.messageFacade.modalDialog('Create a Circuit', CreateCircuitComponent)
  }

  addNewPlayer(player: NewPlayer, dataForm:any) {
    this.callBackend
      .addNewPlayer(player)
      .pipe(takeUntil(this.destroyCallToServer$))
      .subscribe({
        next: (resp) => {
          this.players = [...this.players, resp.data];
          this.messageFacade.toastr('success', `Player ${resp.data.driver.name} created`);
          this.sharedData(dataForm);
        },
        error: (err) => {
          this.messageFacade.errorMessage(err);
        },
      });
  }


  sharedData(dataForm:any){
    console.log('sharedata', dataForm);

    const data: shareDataConfig = {
      state: true,
      data: dataForm,
      dataDrivers: this.players,
    };
    this.sharedService.SharedConfigureForm(data);

  }
}
