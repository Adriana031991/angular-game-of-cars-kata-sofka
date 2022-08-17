import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { NewPlayer } from 'src/app/common/classes/new-player';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { Circuit } from 'src/app/common/models/results-game.interface';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-configure-game',
  templateUrl: './configure-game.component.html',
  styleUrls: ['./configure-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureGameComponent implements OnInit, OnDestroy {
  players: DataPlayer[] = [];
  selectedItem: Circuit = { id: 0, name: '', lanes: [], kilometers: 0 };
  openFieldForm: boolean = false;
  isDisabledSecondForm: boolean = true;
  isDisabledFirstForm: boolean = false;

  public configureGameForm: FormGroup = this.fb.group({
    track: ['', Validators.required],
    numberOfPlayers: [, [Validators.required, Validators.min(3)]],
    nameOfPlayer: [],

  });

  nameOfGame = this.configureGameForm.controls['nameOfGame'];
  nameOfPlayer = this.configureGameForm.controls['nameOfPlayer']
  numberOfPlayers = this.configureGameForm.controls['numberOfPlayers'];
  track = this.configureGameForm.controls['track'];

  destroy$ = new Subject<void>();

  listOfTracks$ = this.callBackend.listCircuits$.pipe(
    map((resp: any) => {
      console.log('circuits', resp.data[5], JSON.stringify(resp.data[5]))
      return resp['data'];
    })
  );

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private callBackend: CallToBackendService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openFieldName() {
    const name = this.nameOfPlayer;
    // const name = this.configureGameForm.get('name');
    name?.setValidators([Validators.required, Validators.min(3)]);
    name?.updateValueAndValidity();

    this.isDisabledSecondForm = false;
    this.isDisabledFirstForm = true;
  }

  resetNameOfPlayerForm() {
    this.nameOfPlayer?.setValue(null);
  }

  resetConfigureForm() {
    this.configureGameForm.reset({
      track: '',
      numberOfPlayers: '',
    });
  }

  back() {
    this.isDisabledFirstForm = false;
    this.isDisabledSecondForm = true;
  }

  invalidField(field: any) {
    return (
      this.configureGameForm.get(field)?.invalid &&
      this.configureGameForm.get(field)?.dirty
    );
  }

  disableButtonEntryPlayer() {
    return (
      this.nameOfPlayer?.invalid ||
      this.players.length ===
        this.numberOfPlayers.value
    );
  }

  disableButtonNext() {
    return (
      this.track.invalid ||
      this.numberOfPlayers.invalid
    );
  }

  enterPlayer() {
    // const dataPlayerForm = this.configureGameForm.controls['name'].value;

    const player = new NewPlayer(0, this.nameOfPlayer.value);
    this.callBackend
      .addNewPlayer(player)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        this.players = [...this.players, resp.data];
        // this.sharedData();
        console.log('players3', this.players);
      });
  }

  sharedData() {
    const data: any = {
      state: true,
      data: this.configureGameForm.value,
      dataDrivers: this.players,
    };
    this.sharedService.SharedConfigureForm(data);
    console.log('sharedData', data);
  }
}