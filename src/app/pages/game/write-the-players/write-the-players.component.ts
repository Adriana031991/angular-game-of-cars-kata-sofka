import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NewPlayer } from 'src/app/common/classes/new-player';
import { SecondConfigureForm } from 'src/app/common/models/form.interface';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-write-the-players',
  templateUrl: './write-the-players.component.html',
  styleUrls: ['./write-the-players.component.scss']
})
export class WriteThePlayersComponent implements OnInit, OnDestroy {

  dataNumberOfPlayers: number = 0;
  players: DataPlayer[] = [];

  public nameOfPlayerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  })

  destroy$ = new Subject<void>();

  firstConfigureForm$ = this.sharedService.firstConfigureForm$
  .subscribe((data:any) => {
    this.dataNumberOfPlayers = data.data.numberOfPlayers;
  })


  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private callBackend: CallToBackendService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

  resetNameOfPlayerForm() {
    this.nameOfPlayerForm.reset();
    this.nameOfPlayerForm.enable();
  }

  invalidFieldNameOfPlayerForm(field: any) {
    return this.nameOfPlayerForm.get(field)?.invalid && this.nameOfPlayerForm.get(field)?.dirty;
  }

  disableButton(){
    return this.nameOfPlayerForm.invalid || this.players.length === this.dataNumberOfPlayers
  }

  enterPlayer() {

    const dataPlayerForm = this.nameOfPlayerForm.controls['name'].value;

    const player = new NewPlayer(0,dataPlayerForm);

    this.callBackend.addNewPlayer(player)
    .pipe(takeUntil(this.destroy$))
    .subscribe(resp => {
      this.players = [...this.players, resp.data]
      this.sharedData();

    });

  }

  sharedData(){
    const data: SecondConfigureForm = {state:true, data: this.players}
    this.sharedService.SharedSecondConfigureForm(data)

  }


}
