import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationsFacadeService } from './services/configurations-facade.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { mockDataPlayers, mockResultObservableShareDataConfig } from '../test/mocks';

describe('ConfigurationsComponent', () => {
  let component: ConfigurationsComponent;
  let fixture: ComponentFixture<ConfigurationsComponent>;
  let serviceSpy: jasmine.SpyObj<ConfigurationsFacadeService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('ConfigurationsFacadeService', [
      'startGame',  
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ConfigurationsComponent ],
      providers: [
        { provide: ConfigurationsFacadeService, useValue: serviceSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })

    .compileComponents();
    serviceSpy.configureForm$ = of(mockResultObservableShareDataConfig) //mock of response of pipe of observable in component
  
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should startGame() call service with a body', () => {
    const body = { 
      circuit:mockResultObservableShareDataConfig.data?.track,
      cars:[...mockDataPlayers]
    }
    let spy = serviceSpy.startGame.and.callThrough();
    component.startGame();
    // expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(body);
  });


});
