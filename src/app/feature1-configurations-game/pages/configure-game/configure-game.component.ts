import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map,  Subject} from 'rxjs';
import { NewPlayer } from 'src/app/shared/classes/new-player';
import { DataPlayer } from 'src/app/shared/models/player-interfaces';
import { Circuit } from 'src/app/shared/models/results-game.interface';

import { ConfigurationsFacadeService } from '../../services/configurations-facade.service';

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
    track: ['', [Validators.required, Validators.minLength(1)]],
    numberOfPlayers: [, [Validators.required, Validators.min(3)]],
    nameOfPlayer: ['', [Validators.required, Validators.minLength(3)]],
  });

  nameOfPlayer = this.configureGameForm.controls['nameOfPlayer'];
  numberOfPlayers = this.configureGameForm.controls['numberOfPlayers'];
  track = this.configureGameForm.controls['track'];

  destroyCallToServer$ = new Subject<void>();

  listOfTracks$ = this.configService.listOfTracks$
    


  constructor(
    private fb: FormBuilder,
    private configService: ConfigurationsFacadeService
  ) { }

  ngOnInit(): void {
    this.setValidatorsToNameOfPlayerField();
    this.listOfTracks$;
  }

  setValidatorsToNameOfPlayerField() {
    this.configureGameForm.get(['track', 'numberOfPlayers'])?.valueChanges.subscribe((checkValue) => {
      const name = this.configureGameForm.get('nameOfPlayer');
      if (checkValue) {
        name?.setValidators([Validators.required, Validators.minLength(3)]);
      } else {
        name?.clearValidators();
      }
      name?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroyCallToServer$.next();
    this.destroyCallToServer$.complete();
  }

  openFieldName() {
    this.isDisabledSecondForm = false;
    this.isDisabledFirstForm = true;
  }

  resetNameOfPlayerForm() {
    this.nameOfPlayer?.setValue('');
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

  invalidField(field: string) {
    return (
      this.configureGameForm.get(field)?.invalid &&
      this.configureGameForm.get(field)?.dirty
    );
  }

  createCircuit() {
    this.configService.createCircuit();
  }


  enterPlayer() {
    const player = new NewPlayer(0, this.nameOfPlayer.value);
    this.configService.addNewPlayer(player, this.configureGameForm.value);
    this.resetNameOfPlayerForm();

  }

  disableButtonEntryPlayer() {
    return (
      this.nameOfPlayer.invalid ||
      this.players.length === this.numberOfPlayers.value
    );
  }

  disableButtonNext() {
    return this.track.invalid || this.numberOfPlayers.invalid;
  }

}
