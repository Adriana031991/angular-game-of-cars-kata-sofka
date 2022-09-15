import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesFacadeService } from 'src/app/shared/services';

import { PodiumComponent } from './podium.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PodiumComponent', () => {
  let component: PodiumComponent;
  let fixture: ComponentFixture<PodiumComponent>;
  let routerFacadeSpy: jasmine.SpyObj<RoutesFacadeService>;

  beforeEach(async () => {
    routerFacadeSpy = jasmine.createSpyObj('RoutesFacadeService', [
      'navigateToNewGame'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ PodiumComponent ],
      providers: [
        { provide: RoutesFacadeService, useValue: routerFacadeSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should method startNewGame() call routerFacade service', () => {
    const spy = routerFacadeSpy.navigateToNewGame;
    component.startNewGame();
    expect(spy.calls.count()).toBe(1);
  });

});
