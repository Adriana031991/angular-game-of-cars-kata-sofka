import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { DataPlayer, Driver, NewPlayerInterface } from 'src/app/shared/models/player-interfaces';
import { Circuit } from 'src/app/shared/models/results-game.interface';
import { shareDataConfig } from 'src/app/shared/models/shared.interface';
import { TableFacadeService } from '../../services/table-facade.service';

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

  configureForm$ = this.tableFacade.configureForm$
    .pipe(
      takeUntil(this.destroyConfigure$))
    .subscribe((resp: shareDataConfig) => (this.drivers = resp.dataDrivers as DataPlayer[]))


  constructor(
    private tableFacade: TableFacadeService,
    @Optional() protected ref: NbDialogRef<EditDialogComponent>,
  ) { }


  ngOnInit(): void {

  }


  savePlayer() {
    const body: NewPlayerInterface = { idDto: this.data.id, nameDto: this.data.name };

    this.tableFacade.savePlayer(body, this.drivers)

    this.cancel();

  }

  cancel() {
    this.ref.close();
  }



  updateCircuit() {

    const body: Circuit = { id: this.data.id, name: this.data.name, lanes: this.data.amount_Lanes, kilometers: this.data.kilometers }

    this.tableFacade.updateCircuit(body);

    this.cancel();

  }

}
