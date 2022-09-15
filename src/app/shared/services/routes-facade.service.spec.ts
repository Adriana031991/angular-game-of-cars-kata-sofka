import { TestBed } from '@angular/core/testing';

import { RoutesFacadeService } from './routes-facade.service';
import { SharedService } from './shared.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

describe('FacadeService', () => {
  let service: RoutesFacadeService;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  // let routerSpy: jasmine.SpyObj<Router>;
  let routerEventReplaySubject: ReplaySubject<RouterEvent>;
  let routerMock: { navigate: any; events?: Observable<RouterEvent>; };
  
  beforeEach(() => {
    sharedServiceSpy = jasmine.createSpyObj('SharedService', ['toggle']);
    // routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    routerEventReplaySubject = new ReplaySubject<RouterEvent>();
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      events: routerEventReplaySubject.asObservable()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(RoutesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate To Home', () => {
    service.navigateToHome();
    const navArgs = routerMock.navigate.calls.all();
    expect(navArgs[0].args[0]).toEqual(['/layout/home']);
  });


  it('should navigate To Podium', () => {
    service.navigateToPodium();
    const navArgs1 = routerMock.navigate.calls.all();
    expect(navArgs1[0].args[0]).toEqual(['/layout/podium']);
  });

  it('should navigate To new game', () => {
    service.navigateToNewGame();
    const navArgs1 = routerMock.navigate.calls.all();
    expect(navArgs1[0].args[0]).toEqual(['/layout/game/new-game']);
  });

  it('should navigate To rr **', () => {
    service.navigateToRr();
    const navArgs1 = routerMock.navigate.calls.all();
    expect(navArgs1[0].args[0]).toEqual(['/layout/rr']);
  });



});
