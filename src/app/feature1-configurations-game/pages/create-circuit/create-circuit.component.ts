import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';

import { ConfigurationsFacadeService } from '../../services/configurations-facade.service';

@Component({
  selector: 'app-create-circuit',
  templateUrl: './create-circuit.component.html',
  styleUrls: ['./create-circuit.component.scss'],
})
export class CreateCircuitComponent implements OnInit {
  @Input() title!: string;
  public createCircuitForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    kilometers: [, [Validators.required, Validators.min(1000)]],
    lanes: this.fb.array([]),
  });

  get lanes() {
    return this.createCircuitForm.get('lanes') as FormArray;
  }

  get kilometers()  {return this.createCircuitForm.controls['kilometers'];}
  get nameOfTrack() {return this.createCircuitForm.controls['name'];}

  destroyCallToServer$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    @Optional() protected ref: NbDialogRef<CreateCircuitComponent>,
    private configService: ConfigurationsFacadeService
  ) { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyCallToServer$.next();
    this.destroyCallToServer$.complete();
  }

  addLanes() {
    const lane = this.fb.group({
      name: ['', Validators.required],
      car: [],
    });
    this.lanes.push(lane);
    // console.log('add lane')
  }

  removeLane(index: number) {
    this.lanes.removeAt(index);
  }

  invalidField(field: any) {
    return (
      this.createCircuitForm.get(field)?.invalid &&
      this.createCircuitForm.get(field)?.dirty
    );
  }

  disableButton() {
    return this.nameOfTrack.invalid || this.kilometers.invalid || this.lanes.invalid;
  }
  enterDataCircuit() {

    const data = this.createCircuitForm.value;
    this.configService.enterDataCircuit(data);
    this.cancel();
  }


  cancel() {

    this.ref.close();

  }

}
