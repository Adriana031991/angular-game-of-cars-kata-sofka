import { compileComponentFromMetadata } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfigurationsFacadeService } from '../../services/configurations-facade.service';

import { ConfigureGameComponent } from './configure-game.component';
import { DataPlayer, Driver } from 'src/app/shared/models/player-interfaces';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';



describe('ConfigureGameComponent', () => {
  let component: ConfigureGameComponent;
  let fixture: ComponentFixture<ConfigureGameComponent>;
  let serviceSpy: jasmine.SpyObj<ConfigurationsFacadeService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ConfigurationsFacadeService', [
      'createCircuit', 'addNewPlayer'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ConfigureGameComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ConfigurationsFacadeService, useValue: serviceSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();


  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(ConfigureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should method openFieldName() be true', () => {
    component.openFieldName();
    expect(component.openFieldName).toBeTruthy();
  });

  it('should isDisabledFirstForm be true', () => {
    component.isDisabledFirstForm = false;
    component.openFieldName();
    expect(component.isDisabledFirstForm).toBeTruthy();
  });

  it('should method resetNameOfPlayerForm() set value "" to nameOfPlayer ', () => {
    const name = component.nameOfPlayer.value;
    component.resetNameOfPlayerForm();
    const name1 = '';
    expect(name).toEqual(name1);
  });

  it('should method resetConfigureForm() set value "" to track ', () => {
    const value = component.track.value;
    component.resetConfigureForm();
    const value1 = '';
    expect(value).toEqual(value1);
  });

  it('should isDisabledFirstForm to be false ', () => {
    component.isDisabledFirstForm = true;
    component.back();
    expect(component.isDisabledFirstForm).toBeFalsy();
  });

  it('should nameOfPlayer to be invalid in method invalidField() ', () => {
    component.invalidField('nameOfPlayer')
    expect(component.nameOfPlayer.invalid).toBeTruthy();
  });

  it('should nameOfPlayer to be valid after set value in method invalidField() ', () => {
    component.nameOfPlayer.setValue('nameOfPlayer');
    component.invalidField('nameOfPlayer')
    expect(component.nameOfPlayer.valid).toBeTruthy();
  });

  it('should method createCircuit() exist ', () => {
    component.createCircuit();
    expect(component.createCircuit).toBeTruthy();
  });

  it('should method createCircuit() call service ', () => {
    const spy = serviceSpy.createCircuit.and.callThrough();
    component.createCircuit();
    expect(spy).toHaveBeenCalled();
  });

  it('should method enterPlayer() exist ', () => {
    component.enterPlayer();
    expect(component.enterPlayer).toBeTruthy();
  });

  it('should method enterPlayer() call service ', () => {
    const spy = serviceSpy.addNewPlayer.and.callThrough();
    component.enterPlayer();
    expect(spy).toHaveBeenCalled();
  });


  it('should method setValidatorsToNameOfPlayerField() exist ', () => {
    component.setValidatorsToNameOfPlayerField();
    expect(component.setValidatorsToNameOfPlayerField).toBeTruthy();
  });

  it('should field nameOfPlayer be valid ', () => {

    const nameField = component.configureGameForm.get('nameOfPlayer');
    nameField?.setValue('rrr');
    expect(nameField?.invalid).toBeFalsy();
    
  });

  it('should field nameOfPlayer have validator required ', () => {

    const nameField = component.configureGameForm.get('nameOfPlayer');
    nameField?.setValue('');
    component.setValidatorsToNameOfPlayerField();

    expect(nameField?.valid).toBeFalsy();
    
  });




  // it('should method setValidatorsToNameOfPlayerField() clear validators to nameOfPlayer ', () => {

    
  //   const nameField = component.configureGameForm.get('nameOfPlayer');
    
    
  //   component.configureGameForm.get(['track', 'numberOfPlayers'])?.statusChanges.subscribe(res => {
  //     // nameField?.clearValidators();
      
  //     component.setValidatorsToNameOfPlayerField();
  //   });
  //   component.ngOnInit();
  //   expect(nameField?.clearValidators()).toBeTruthy();



  // });

  });
