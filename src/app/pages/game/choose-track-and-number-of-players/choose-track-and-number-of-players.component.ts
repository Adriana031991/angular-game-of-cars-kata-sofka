import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { FirstConfigureForm } from 'src/app/common/models/form.interface';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { Circuit } from 'src/app/common/models/results-game.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-choose-track-and-number-of-players',
  templateUrl: './choose-track-and-number-of-players.component.html',
  styleUrls: ['./choose-track-and-number-of-players.component.scss']
})
export class ChooseTrackAndNumberOfPlayersComponent implements OnInit {

  selectedItem:Circuit = { id:0, name: '', lanes: [], kilometers: 0 };


  public firstConfigureForm: FormGroup = this.fb.group({
    track:            ['', Validators.required],
    numberOfPlayers:  [, [Validators.required, Validators.min(3)]],
  });

  listCircuits$ = this.callBackend.listCircuits$.pipe(map((resp:any) => {return resp['data'];}));

  constructor(private fb: FormBuilder,
    private callBackend: CallToBackendService,
    private sharedService: SharedService) { }



  ngOnInit(): void {

  }

  resetGameForm() {
    this.firstConfigureForm.reset({
      track: '',  numberOfPlayers:'',
    });
  }


  invalidFieldGameForm(field: any) {
    return this.firstConfigureForm.get(field)?.invalid && this.firstConfigureForm.get(field)?.dirty;
  }


  chargeDataOfTrackAndNumberOfPlayer() {
    const data: FirstConfigureForm = {state:true, data: this.firstConfigureForm.value}
    this.sharedService.SharedFirstConfigureForm(data)
  }

}
