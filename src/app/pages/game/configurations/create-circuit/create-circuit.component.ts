import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CallToBackendService } from 'src/app/services/call-to-backend.service';

@Component({
  selector: 'app-create-circuit',
  templateUrl: './create-circuit.component.html',
  styleUrls: ['./create-circuit.component.scss']
})
export class CreateCircuitComponent implements OnInit {

  public createCircuitForm: FormGroup = this.fb.group({
    nameOfTrack: ['', [Validators.required, Validators.min(3)]],
    kilometers: [, [Validators.required, Validators.min(1000)]],
    lanes: ['', [Validators.required, Validators.min(3)]],
    nameOfLane: [],
    car: [] //no necesario oligarlo
  });

  kilometers = this.createCircuitForm.controls['kilometers'];
  nameOfTrack = this.createCircuitForm.controls['nameOfTrack'];
  lanes = this.createCircuitForm.controls['lanes'];

  destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder,
    private callBackend: CallToBackendService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  invalidField(field: any) {
    return (
      this.createCircuitForm.get(field)?.invalid &&
      this.createCircuitForm.get(field)?.dirty
    );
  }

  disableButton() {
    return (
      this.nameOfTrack.invalid || this.kilometers.invalid
    );
  }


  enterDataLane() {
//una vez escrito la cantidad de lanes,
//habilite los campos name of lane y car,
//este no es necesario obligarlo


  }

  enterDataCircuit(){

    const data = this.createCircuitForm.value

    console.log('data create circuit', data)

//     this.callBackend.saveCircuit(data)
//     .pipe(takeUntil(this.destroy$))
//     .subscribe(resp => {

// console.log('resp circuit', resp);

//     });

  }

  reset(){

  }

}
