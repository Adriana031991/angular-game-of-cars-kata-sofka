import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutesFacadeService } from 'src/app/shared/services';

import { RaceDialogComponent } from './race-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

describe('RaceDialogComponent', () => {
  let component: RaceDialogComponent;
  let fixture: ComponentFixture<RaceDialogComponent>;
  let routerFacadeSpy: jasmine.SpyObj<RoutesFacadeService>;
  let refSpy: jasmine.SpyObj<NbDialogRef<RaceDialogComponent>>

  beforeEach(async () => {
    routerFacadeSpy = jasmine.createSpyObj('RoutesFacadeService', [
      'navigateToPodium'
    ]);

    refSpy = jasmine.createSpyObj('NbDialogRef', [
      'close'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ RaceDialogComponent ],
      providers: [
        { provide: RoutesFacadeService, useValue: routerFacadeSpy },
        { provide: NbDialogRef, useValue: refSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should method goToPodium() call routerFacade service', () => {
    const spy = routerFacadeSpy.navigateToPodium;
    component.goToPodium();
    expect(spy.calls.count()).toBe(1);
  });
  
  it('method goToPodium() should close', () => {
    routerFacadeSpy.navigateToPodium;
    const spy = refSpy.close;
    component.goToPodium();
    expect(spy.calls.count()).toBe(1);
  });

});
