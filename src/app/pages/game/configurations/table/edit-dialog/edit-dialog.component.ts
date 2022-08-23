import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  @Input() title!: string;
  @Input() data!: any;


  constructor(
    private server: CallToBackendService,
    @Optional() protected ref: NbDialogRef<EditDialogComponent>,
  ) { }


  ngOnInit(): void {

  }

  savePlayer(){
    const body = {idDto:this.data.id, nameDto:this.data.name};
    console.log('save', body);
    this.server.updatePlayer(body).subscribe(data => console.log('edit?', data));
    this.ref.close();

  }

  cancel() {
    this.ref.close();

  }
}
