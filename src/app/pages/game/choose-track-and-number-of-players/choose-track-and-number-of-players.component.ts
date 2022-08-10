import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { Circuit } from 'src/app/common/models/results-game.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-choose-track-and-number-of-players',
  templateUrl: './choose-track-and-number-of-players.component.html',
  styleUrls: ['./choose-track-and-number-of-players.component.scss']
})
export class ChooseTrackAndNumberOfPlayersComponent implements OnInit {

  @Output() dataExist: EventEmitter<any> = new EventEmitter<any>();


  selectedItem:Circuit = { id:0, name: '', lanes: [], kilometers: 0 };


  public gameForm: FormGroup = this.fb.group({
    track:            ['', Validators.required],
    numberOfPlayers:  [, [Validators.required, Validators.min(3)]],
  });

  listCircuits$ = this.callBackend.listCircuits$.pipe(map((resp:any) => {return resp['data'];}));

  constructor(private fb: FormBuilder, private callBackend: CallToBackendService) { }



  ngOnInit(): void {

  }

  resetGameForm() {
    this.gameForm.reset({
      track: '',  numberOfPlayers:'',
    });
  }


  invalidFieldGameForm(field: any) {
    return this.gameForm.get(field)?.invalid && this.gameForm.get(field)?.dirty;
  }


  chargeDataOfTrackAndNumberOfPlayer() {
    this.dataExist.emit({state:true, data: this.gameForm.value});
  }

}
