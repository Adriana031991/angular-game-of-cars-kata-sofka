import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map, Subject, takeUntil } from 'rxjs';
import { NewPlayer } from 'src/app/common/classes/new-player';
import { DataPlayer } from 'src/app/common/models/player-interfaces';
import { Circuit } from 'src/app/common/models/results-game.interface';
import { shareDataConfig } from 'src/app/common/models/shared.interface';
import { FacadeService } from 'src/app/pages/services/facade.service';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';
import { SharedService } from 'src/app/services/shared.service';
import { CreateCircuitComponent } from '../create-circuit/create-circuit.component';

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
    nameOfPlayer: ['', [Validators.required, Validators.min(3)]],
  });

  nameOfPlayer = this.configureGameForm.controls['nameOfPlayer'];
  numberOfPlayers = this.configureGameForm.controls['numberOfPlayers'];
  track = this.configureGameForm.controls['track'];

  destroyCallToServer$ = new Subject<void>();

  listOfTracks$ = this.callBackend.listCircuits$.pipe(
    map((resp: any) => {
      return resp['data'];
    })
  );

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private callBackend: CallToBackendService,
    private changeDetection: ChangeDetectorRef,
    private facadeService: FacadeService
  ) { }

  ngOnInit(): void {
    this.setValidatorsToNameOfPlayerField();
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

  invalidField(field: any) {
    return (
      this.configureGameForm.get(field)?.invalid &&
      this.configureGameForm.get(field)?.dirty
    );
  }
  createCircuit() {
    this.facadeService.modalDialog('Create a Circuit',CreateCircuitComponent)


  }


  enterPlayer() {
    const player = new NewPlayer(0, this.nameOfPlayer.value);
    this.callBackend
      .addNewPlayer(player)
      .pipe(takeUntil(this.destroyCallToServer$))
      .subscribe({
        next: (resp) => {
          this.players = [...this.players, resp.data];
          this.sharedData();
          this.changeDetection.detectChanges();
        },
        error: (err) => {
          console.log('error enter player', err);
          const errMessage = err.error.message
            ? err.error.message
            : 'Problem Communicating With Servers';
          this.facadeService.toastr('danger', errMessage);
        },
      });
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

  sharedData() {
    const data: shareDataConfig = {
      state: true,
      data: this.configureGameForm.value,
      dataDrivers: this.players,
    };
    this.sharedService.SharedConfigureForm(data);
    // console.log('sharedData', data);
  }
}
