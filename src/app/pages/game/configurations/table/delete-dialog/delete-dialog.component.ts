import { ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Driver } from 'src/app/common/models/player-interfaces';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  @Input() title!: string;
  @Input() driverId!: any;
  // @Input() driverName!: any;

  constructor(

    private changeDetection: ChangeDetectorRef,
    @Optional() protected ref: NbDialogRef<DeleteDialogComponent>,
  ) {

  }
  ngOnInit(): void {
    this.changeDetection.detectChanges();
  }

  goToPodium() {

    this.ref.close();

  }

  delete() {
    console.log('id driver', this.driverId,  );
  }


}
