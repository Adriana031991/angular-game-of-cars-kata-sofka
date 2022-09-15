import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RoutesFacadeService } from '../../../shared/services/routes-facade.service';

@Component({
  selector: 'app-race-dialog',
  templateUrl: './race-dialog.component.html',
  styleUrls: ['./race-dialog.component.scss']
})
export class RaceDialogComponent {

  @Input() title!: string;

  constructor(
    private facadeService: RoutesFacadeService,
    @Optional() protected ref: NbDialogRef<RaceDialogComponent>,
  ) {}

  goToPodium() {
    this.facadeService.navigateToPodium();
    this.ref.close();

  }

}
