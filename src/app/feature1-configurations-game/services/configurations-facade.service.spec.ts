import { TestBed } from '@angular/core/testing';
import { CallToBackendService, MessagesService, SharedService } from 'src/app/shared/services';

import { ConfigurationsFacadeService } from './configurations-facade.service';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { of, throwError } from 'rxjs';
import { NewPlayer } from 'src/app/shared/classes/new-player';
import { mockDrivers, mockResultAddPlayer, mockResultCircuit, mockResultError, mockResultGame, mockConfigureGameForm, mockErrorConfigureGameForm, mockTrack, mockDataGame } from 'src/app/test/mocks';

describe('ConfigurationsFacadeService', () => {
  let service: ConfigurationsFacadeService;
  let serverServiceSpy: jasmine.SpyObj<CallToBackendService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let messageServiceSpy: jasmine.SpyObj<MessagesService>;


  beforeEach(() => {
    serverServiceSpy = jasmine.createSpyObj('CallToBackendService', [
      'startGame', 'saveCircuit', 'addNewPlayer'
    ]);
    sharedServiceSpy = jasmine.createSpyObj('SharedService', [
      'SharedConfigureForm', 'sharedResultGame'
    ]);
    messageServiceSpy = jasmine.createSpyObj('MessagesService', [
      'errorMessage', 'modalDialog', 'toastr'
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: CallToBackendService, useValue: serverServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: MessagesService, useValue: messageServiceSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    service = TestBed.inject(ConfigurationsFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should startGame() call shared service ', () => {
    const track = mockConfigureGameForm.get('track')?.value;
    const body = {
      circuit: track,
      cars: [...mockDrivers]
    }
    serverServiceSpy.startGame.and.callFake(() => of(mockResultGame))
    const spy2 = sharedServiceSpy.sharedResultGame.and.resolveTo();
    service.startGame(body);
    expect(spy2).toHaveBeenCalled();
  });

  it('should startGame() call server service ', () => {
    const track = mockConfigureGameForm.get('track')?.value;
    const body = {
      circuit: track,
      cars: [...mockDrivers]
    }
    const spy = serverServiceSpy.startGame.and.callFake(() => of(mockResultGame))
    service.startGame(body);
    expect(spy).toHaveBeenCalled();
  });

  it('should startGame() get error when call server service ', () => {

    const spy = serverServiceSpy.startGame.and.returnValue(throwError(() => new Error(mockResultError)));
    // const spy2 = serverServiceSpy.startGame.and.returnValue(throwError(() => new Error({status: 404})));
    service.startGame(mockDataGame);
    expect(spy).toHaveBeenCalled();
  });


  it('should enterDataCircuit() call server and message service ', () => {

    serverServiceSpy.saveCircuit.and.callFake(() => of(mockResultCircuit))
    const spy = messageServiceSpy.toastr.and.resolveTo();
    service.enterDataCircuit(mockTrack);
    expect(spy).toHaveBeenCalled();
  });


  it('should enterDataCircuit() get error when call server service', () => {
    const spy = serverServiceSpy.saveCircuit.and.returnValue(throwError(() => new Error(mockResultError)));
    service.enterDataCircuit(mockTrack);
    expect(spy).toHaveBeenCalled();
  });


  it('should addNewPlayer() call server and message service ', () => {
    const player = new NewPlayer(0, 'test player');
    serverServiceSpy.addNewPlayer.and.callFake(() => of(mockResultAddPlayer))
    const spy = messageServiceSpy.toastr.and.resolveTo();

    service.addNewPlayer(player, mockConfigureGameForm);
    expect(spy).toHaveBeenCalled();
    expect(service.players.length).toBe(1)
  });


  it('should addNewPlayer() get error when call server service', () => {
    const player = new NewPlayer(0, 'test player');

    const spy = serverServiceSpy.addNewPlayer.and.returnValue(throwError(() => new Error(mockResultError)));
    service.addNewPlayer(player, mockConfigureGameForm);

    expect(spy).toHaveBeenCalled();
  });


  it('should createCircuit() call modal service ', () => {

    const spy = messageServiceSpy.modalDialog.and.resolveTo();
    service.createCircuit();
    expect(spy).toHaveBeenCalled();
  });




});
