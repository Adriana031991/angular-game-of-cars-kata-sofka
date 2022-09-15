import { ChangeDetectorRef, Injectable, Optional } from '@angular/core';
import { NbDialogRef, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { map, Subject, takeUntil } from 'rxjs';
import { DataPlayer, Driver, NewPlayerInterface, ResponseUpdatePlayer } from 'src/app/shared/models/player-interfaces';
import { Circuit } from 'src/app/shared/models/results-game.interface';
import { shareDataConfig } from 'src/app/shared/models/shared.interface';
import { TableCircuits } from 'src/app/shared/models/table.interface';
import { CallToBackendService, MessagesService, RoutesFacadeService, SharedService } from 'src/app/shared/services';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class TableFacadeService {

  destroyListOfTracks$ = new Subject<void>();

  listOfTracks$ = this.server.listCircuits$
  configureForm$ = this.sharedService.configureFormSubject$

  constructor(
    private sharedService: SharedService,
    private server: CallToBackendService,
    private messageFacade: MessagesService,
    @Optional() protected ref: NbDialogRef<any>,

  ) { }

  cancel() {
    this.ref.close();

  }

  edit(title:string, value: Circuit | Driver, ) {
    this.messageFacade.modalDialog(title, EditDialogComponent, value)

  }

  delete(title:string,value: Circuit | Driver) {
  
    if ( value.name === null) {
      value.name = 'Circuit whitout name'
    }
    this.messageFacade.modalDialog(title,DeleteDialogComponent , value)

  }


  savePlayer(body:NewPlayerInterface, drivers:DataPlayer[]) {

    this.server.updatePlayer(body).subscribe(

      {
        next: (data: ResponseUpdatePlayer) => {
          //forma de editar un objeto y retornarlo al array
          drivers = drivers.map((resp: any) => {
            if (resp.driver.id === data.data.id) {
              resp.driver.name = data.data.name
            }
            return resp
          })

          this.sharedUpdateDate(drivers);
          this.messageFacade.toastr('success', `Player updated`);


        },
        error: (err) => {
          console.log('error enter player', err);
          this.messageFacade.errorMessage(err);
        },
      }

    )
  }

  

  private sharedUpdateDate(drivers:DataPlayer[]) {
    const value: shareDataConfig = {
      state: true,
      data: {
        track: '',
        numberOfPlayers: 0,
        nameOfPlayer: ''
      },
      dataDrivers: drivers,
    };
    this.sharedService.SharedConfigureForm(value);
  }



  updateCircuit(body:Circuit){

    this.server.updateCircuit(body).subscribe(
     { next: (res) => {
      console.log('res server',res)
      this.messageFacade.toastr('success', `Player ${body.name} updated`);


     } ,

     error: (err) => {
       this.messageFacade.errorMessage(err);
     },
    }
    )
  }


  deletePlayer(id: number, drivers:DataPlayer[]) {
    this.server.deletePlayer(id).subscribe(
      {
        next: (value) => {
          drivers.map((item: any, index) => {
            if (item.driver.id === id) {
              drivers.splice(index, 1);
            }
          })
          this.sharedUpdateDate(drivers);
          this.messageFacade.toastr('success', `Player deleted`);

        },

        error: (err) => {
          this.messageFacade.errorMessage(err);
        },
      })
  }





  deleteCircuit(id: number , name?:string) {

    this.server.deleteCircuit(id).subscribe(
      {
        next: (resp) => {
          this.messageFacade.toastr('success', `Circuit ${name} deleted`);
          // this.cancel();
        },

        error: (err) => {
          this.messageFacade.errorMessage(err);
        }
      }
    )

  }

}
