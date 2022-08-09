import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { NewPlayer } from 'src/app/common/classes/new-player';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-write-the-players',
  templateUrl: './write-the-players.component.html',
  styleUrls: ['./write-the-players.component.scss']
})
export class WriteThePlayersComponent implements OnInit, OnDestroy {

  @Input() dataNumberOfPlayers: number = 0;
  @Output() dataPlayers: EventEmitter<any> = new EventEmitter<any>();
  // @Output() gameStarted: EventEmitter<boolean> = new EventEmitter<boolean>();
  players: DataPlayer[] = [];

  public nameOfPlayerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]]
  })

  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private callBackend: CallToBackendService) { }

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

    this.callBackend.addNewPlayer(player).pipe(takeUntil(this.destroy$)).subscribe(resp => {
      this.players = [...this.players, resp.data]
      this.dataPlayers.emit({data:this.players, gameStarted: true});
      // this.gameStarted.emit(true);
    });

  }


}
