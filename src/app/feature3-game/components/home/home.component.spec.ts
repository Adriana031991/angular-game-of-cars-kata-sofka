import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesFacadeService } from 'src/app/shared/services';

import { HomeComponent } from './home.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerFacadeSpy: jasmine.SpyObj<RoutesFacadeService>;

  beforeEach(async () => {
    routerFacadeSpy = jasmine.createSpyObj('RoutesFacadeService', [
      'navigateToNewGame'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: RoutesFacadeService, useValue: routerFacadeSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should method goToNewGame() call routerFacade service', () => {
    const spy = routerFacadeSpy.navigateToNewGame;
    component.goToNewGame();
    expect(spy.calls.count()).toBe(1);
  });
});
