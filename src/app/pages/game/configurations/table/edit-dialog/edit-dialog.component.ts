import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { DataPlayer, ResponseUpdatePlayer } from 'src/app/common/models/player-interfaces';
import { shareDataConfig } from 'src/app/common/models/shared.interface';
import { FacadeService } from 'src/app/pages/services/facade.service';
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
  drivers: DataPlayer[] = [];

  configureForm$ = this.sharedService.configureFormSubject$
    .pipe(
      takeUntil(this.destroyConfigure$))
    .subscribe((resp: shareDataConfig) => (this.drivers = resp.dataDrivers as DataPlayer[]))


  constructor(
    private sharedService: SharedService,
    private server: CallToBackendService,
    private facadeService: FacadeService,
    @Optional() protected ref: NbDialogRef<EditDialogComponent>,
  ) { }


  ngOnInit(): void {

  }

  savePlayer() {
    const body = { idDto: this.data.id, nameDto: this.data.name };

    this.server.updatePlayer(body).subscribe(

      {
        next: (data: ResponseUpdatePlayer) => {
          //forma de editar un objeto y retornarlo al array
          this.drivers = this.drivers.map((resp: any) => {
            if (resp.driver.id === data.data.id) {
              resp.driver.name = data.data.name
            }
            return resp
          })

          this.sharedUpdateDate();

          this.cancel();
        },
        error: (err) => {
          console.log('error enter player', err);
          this.facadeService.errorMessage(err);
        },
      }

    )
  }

  cancel() {
    this.ref.close();

  }

  private sharedUpdateDate() {
    const value: shareDataConfig = {
      state: true,
      data: {
        track: '',
        numberOfPlayers: 0,
        nameOfPlayer: ''
      },
      dataDrivers: this.drivers,
    };
    this.sharedService.SharedConfigureForm(value);
  }
}
