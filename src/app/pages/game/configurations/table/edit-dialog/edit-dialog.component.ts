import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { DataPlayer, Driver, ResponseUpdatePlayer } from 'src/app/common/models/player-interfaces';
import { shareDataConfig } from 'src/app/common/models/shared.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input() title!: string;
  @Input() data!: any;

  destroyConfigure$ = new Subject<void>();
  drivers: DataPlayer[]  = [];

  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(
      takeUntil(this.destroyConfigure$))
    .subscribe( (resp: shareDataConfig) => (this.drivers =  resp.dataDrivers as DataPlayer[]))


  constructor(
    private sharedService:SharedService,
    private server: CallToBackendService,
    @Optional() protected ref: NbDialogRef<EditDialogComponent>,
  ) { }


  ngOnInit(): void {

  }

  savePlayer(){
    const body = {idDto:this.data.id, nameDto:this.data.name};

    console.log('save', body);

    this.server.updatePlayer(body).subscribe((data: ResponseUpdatePlayer) => {

      console.log('data', data)
      let a = this.drivers?.find((d) => d.driver.id === data.data.id)

      if (a != undefined && this.drivers.length > 0) {
        a.driver.name = data.data.name
      }
      //forma de editar un objeto y retornarlo al array

      this.drivers = this.drivers.map((resp: any) => {
        if (resp.driver.id === data.data.id) {
          resp.driver.name = data.data.name

        }
        return resp
      })

      const value: shareDataConfig = {
        state: true,
        data: {track: '',
          numberOfPlayers: 0,
          nameOfPlayer: ''},
        dataDrivers: this.drivers,
      };
      this.sharedService.SharedConfigureForm(value)
      console.log('edit?', data)});

    this.ref.close();

  }

  cancel() {
    this.ref.close();

  }
}
