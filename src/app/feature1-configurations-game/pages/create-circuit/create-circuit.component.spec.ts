import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { mockCreateCircuitForm } from 'src/app/test/mocks';
import { ConfigurationsFacadeService } from '../../services/configurations-facade.service';

import { CreateCircuitComponent } from './create-circuit.component';

describe('CreateCircuitComponent', () => {
  let component: CreateCircuitComponent;
  let fixture: ComponentFixture<CreateCircuitComponent>;
  let serviceSpy: jasmine.SpyObj<ConfigurationsFacadeService>;
  let refSpy: jasmine.SpyObj<NbDialogRef<CreateCircuitComponent>>


  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ConfigurationsFacadeService', [
      'enterDataCircuit'
    ]);
    refSpy = jasmine.createSpyObj('NbDialogRef<CreateCircuitComponent>', [
      'close'
    ]);

    await TestBed.configureTestingModule({
      declarations: [CreateCircuitComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ConfigurationsFacadeService, useValue: serviceSpy },
        { provide: NbDialogRef, useValue: refSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should addLanes() exist', () => {
    component.addLanes()
    expect(component.addLanes).toBeTruthy();
  });

  it('should removeLane() exist', () => {
    component.removeLane(1)
    expect(component.removeLane).toBeTruthy();
  });

  it('should removeLane ', () => {
    const lane = new FormBuilder().group({
      name: ['hola'],
      car: [],
    });
    const lane2 = new FormBuilder().group({
      name: ['hola'],
      car: [],
    });
    component.lanes.push(lane);
    component.lanes.push(lane2);
    component.removeLane(1)
    expect(component.lanes.length).toBe(1);
  });

  it('should cancel() exist', () => {
    component.cancel()
    expect(component.cancel).toBeTruthy();
  });


  it('should method cancel() call ref ', () => {
    const spy = refSpy.close.and.callThrough();
    component.cancel();
    expect(spy).toHaveBeenCalled();
  });

  
  it('should method enterDataCircuit() call service ', () => {
    const spy = serviceSpy.enterDataCircuit.and.callThrough();
    component.enterDataCircuit();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should method enterDataCircuit() call service with a form ', () => {
    const spy = serviceSpy.enterDataCircuit.and.callThrough();
    component.enterDataCircuit();
    expect(spy).toHaveBeenCalledWith(mockCreateCircuitForm.value);
  });

  it('should form createCircuitForm("kilometers") be invalid after call method invalidField() ', () => {
    component.kilometers.setValue('');
    component.invalidField('kilometers')
    expect(component.kilometers.invalid).toBeTruthy();
  });

});
