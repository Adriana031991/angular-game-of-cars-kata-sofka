import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { DataPlayer } from 'src/app/shared/models/player-interfaces';
import { Circuit } from 'src/app/shared/models/results-game.interface';
import { shareDataConfig } from 'src/app/shared/models/shared.interface';
import { TableFacadeService } from '../../services/table-facade.service';

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

  configureForm$ = this.tableFacade.configureForm$
    .pipe(
      takeUntil(this.destroyConfigure$))
    .subscribe((resp: shareDataConfig) => (this.drivers = resp.dataDrivers as DataPlayer[]))


  constructor(
    private tableFacade: TableFacadeService,
    @Optional() protected ref: NbDialogRef<DeleteDialogComponent>,
  ) {

  }
  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

  deletePlayer() {
    this.tableFacade.deletePlayer(this.data.id!, this.drivers);
    this.cancel();
  }


  deleteCircuit() {
    this.tableFacade.deleteCircuit(this.data.id!, this.data.name!);
    this.cancel();

  }
}
