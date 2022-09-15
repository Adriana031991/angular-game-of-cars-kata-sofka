import { TestBed } from '@angular/core/testing';
import { NbDialogRef } from '@nebular/theme';
import { CallToBackendService, MessagesService, SharedService } from 'src/app/shared/services';

import { TableFacadeService } from './table-facade.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockDataPlayers, mockNewPlayerInterface, mockResponseUpdatePlayer, mockResultCircuit, mockResultError, mockTrack } from 'src/app/test/mocks';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../components/edit-dialog/edit-dialog.component';
import { of, throwError } from 'rxjs';

describe('TableFacadeService', () => {
  let service: TableFacadeService;
  let refSpy: jasmine.SpyObj<NbDialogRef<any>>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let serverServiceSpy: jasmine.SpyObj<CallToBackendService>;
  let messageServiceSpy: jasmine.SpyObj<MessagesService>;

  beforeEach(() => {
    refSpy = jasmine.createSpyObj('NbDialogRef', [
      'close'
    ]);
    sharedServiceSpy = jasmine.createSpyObj('SharedService', [
      'SharedConfigureForm'
    ]);
    serverServiceSpy = jasmine.createSpyObj('CallToBackendService', [
      'updatePlayer', 'updateCircuit', 'deletePlayer', 'deleteCircuit'
    ]);
    messageServiceSpy = jasmine.createSpyObj('MessagesService', [
      'modalDialog', 'toastr', 'errorMessage'
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: MessagesService, useValue: messageServiceSpy },
        { provide: CallToBackendService, useValue: serverServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: NbDialogRef, useValue: refSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(TableFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should edit() call modalDialog of message service', () => {
    const spy = messageServiceSpy.modalDialog.and.callThrough();
    service.edit('title test', mockTrack)
    expect(spy).toHaveBeenCalledWith('title test',EditDialogComponent  ,mockTrack);
  });


  it('should delete() call modalDialog of message service', () => {
    const spy = messageServiceSpy.modalDialog.and.callThrough();
    service.delete('title test', mockTrack)
    expect(spy).toHaveBeenCalledWith('title test',DeleteDialogComponent  ,mockTrack);
  });

  
  it('should delete() change value.name to "Circuit whitout name" ', () => {
    mockTrack.name = null;

    const spy = messageServiceSpy.modalDialog.and.callThrough();
    service.delete('title test', mockTrack)
    expect(spy).toHaveBeenCalledWith('title test',DeleteDialogComponent  ,mockTrack);
  });

  it('should savePlayer() call method updatePlayer of server', () => {
    const spy = serverServiceSpy.updatePlayer.and.returnValue(of(mockResponseUpdatePlayer));
    service.savePlayer(mockNewPlayerInterface, mockDataPlayers)
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0].nameDto).toBe('test name player');

  });


  it('should savePlayer() get error when call server service', () => {
    const spy = serverServiceSpy.updatePlayer.and.returnValue(throwError(() => new Error(mockResultError)));
    service.savePlayer(mockNewPlayerInterface, mockDataPlayers);
    expect(spy).toHaveBeenCalledWith(mockNewPlayerInterface); //intento de llamar el servicio con un body erroneo..fallido

  });

  it('should updateCircuit() call method updateCircuit of server', () => {
    mockTrack.name = 'test track';

    const spy = serverServiceSpy.updateCircuit.and.returnValue(of(mockTrack));
    service.updateCircuit(mockTrack)
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0].name).toBe('test track');

  });


  it('should updateCircuit() get error when call server service', () => {
    const spy = serverServiceSpy.updateCircuit.and.returnValue(throwError(() => new Error(mockResultError)));
    service.updateCircuit(mockTrack);
    expect(spy).toHaveBeenCalledWith(mockTrack); //intento de llamar el servicio con un body erroneo..fallido

  });

  it('should deletePlayer() call method deletePlayer of server', () => {
    const spy = serverServiceSpy.deletePlayer.and.returnValue(of(mockDataPlayers));
    service.deletePlayer(1, mockDataPlayers)
    expect(spy.calls.count()).toBe(1);
    expect(mockDataPlayers.length).toBe(1);

  });


  it('should deletePlayer() get error when call server service', () => {
    const spy = serverServiceSpy.deletePlayer.and.returnValue(throwError(() => new Error(mockResultError)));
    service.deletePlayer(1, mockDataPlayers);
    expect(spy).toHaveBeenCalled(); //intento de llamar el servicio con un body erroneo..fallido

  });

  it('should deleteCircuit() call method deleteCircuit of server', () => {
    const spy = serverServiceSpy.deleteCircuit.and.returnValue(of(mockResultCircuit));
    service.deleteCircuit(1)
    expect(spy.calls.count()).toBe(1);

  });

  it('should deleteCircuit() call method toastr of messageservice', () => {
    serverServiceSpy.deleteCircuit.and.returnValue(of(mockResultCircuit));
    const spy = messageServiceSpy.toastr.and.callThrough();
    service.deleteCircuit(1)
    expect(spy.calls.count()).toBe(1);

  });


  it('should deleteCircuit() get error when call server service', () => {
    const spy = serverServiceSpy.deleteCircuit.and.returnValue(throwError(() => new Error(mockResultError)));
    service.deleteCircuit(1);
    expect(spy).toHaveBeenCalled(); //intento de llamar el servicio con un body erroneo..fallido

  });

  it('should deleteCircuit() call method errorMessage of messageservice', () => {
    serverServiceSpy.deleteCircuit.and.returnValue(throwError(() => new Error(mockResultError)));
    const spy = messageServiceSpy.errorMessage.and.callThrough();

    service.deleteCircuit(1);
    expect(spy).toHaveBeenCalled(); //intento de llamar el servicio con un body erroneo..fallido

  });

  it('should method cancel() active ref.close', () => {
    service.cancel();
    expect(service.cancel).toBeTruthy(); 

  });


});
