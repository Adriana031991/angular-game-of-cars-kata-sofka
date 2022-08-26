import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbWindowRef } from '@nebular/theme';
import { Subject, takeUntil } from 'rxjs';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-create-circuit',
  templateUrl: './create-circuit.component.html',
  styleUrls: ['./create-circuit.component.scss'],
})
export class CreateCircuitComponent implements OnInit {
  @Input() title!: string;

  public createCircuitForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.min(3)]],
    kilometers: [, [Validators.required, Validators.min(1000)]],
    lanes: this.fb.array([]),
  });

  get lanes() {
    return this.createCircuitForm.get('lanes') as FormArray;
  }

  kilometers = this.createCircuitForm.controls['kilometers'];
  nameOfTrack = this.createCircuitForm.controls['name'];

  destroyCallToServer$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private callBackend: CallToBackendService,
    @Optional() protected ref: NbDialogRef<CreateCircuitComponent>,

  ) {}


  ngOnInit(): void {
    this.addLanes();
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
    return this.nameOfTrack.invalid || this.kilometers.invalid;
  }

  enterDataCircuit() {
    const data = this.createCircuitForm.value;

    this.callBackend
      .saveCircuit(data)
      .pipe(takeUntil(this.destroyCallToServer$))
      .subscribe((resp) => {
        console.log('resp circuit', resp);
      });
      this.cancel();
  }

  cancel() {
    this.ref.close();

  }

}
