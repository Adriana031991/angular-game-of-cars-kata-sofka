import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { shareDataConfig } from 'src/app/common/models/shared.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

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
    @Optional() protected ref: NbDialogRef<DeleteDialogComponent>,
  ) {

  }
  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  delete() {
    this.server.deletePlayer(this.data.id).subscribe(
      {
        next: (value) => {
          console.log('delete?', value)
          this.drivers.map((item: any, index) => {
            if(item.driver.id === this.data ){
              this.drivers.splice(index, 1);
            }
          })

          console.log('item',this.drivers)
          this.sharedUpdateDate();
          this.ref.close();
        },

        error: (err) => { console.log }
      })
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
