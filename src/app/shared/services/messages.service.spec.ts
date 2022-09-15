import { TestBed } from '@angular/core/testing';
import { NbDialogService, NbSidebarService, NbToastrService, NbWindowService } from '@nebular/theme';

import { MessagesService } from './messages.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DeleteDialogComponent } from 'src/app/feature2-tables/components/delete-dialog/delete-dialog.component';

describe('MessagesService', () => {
  let service: MessagesService;

  let sidebarServiceSpy: jasmine.SpyObj<NbSidebarService>;
  let dialogServiceSpy: jasmine.SpyObj<NbDialogService>;
  let windowServiceSpy: jasmine.SpyObj<NbWindowService>;
  let toastSpy: jasmine.SpyObj<NbToastrService>;

  beforeEach(() => {
    sidebarServiceSpy = jasmine.createSpyObj('NbSidebarService', [
      'toggle'
    ]);
    dialogServiceSpy = jasmine.createSpyObj('NbDialogService', [
      'open'
    ]);
    windowServiceSpy = jasmine.createSpyObj('NbWindowService', [
      'open'
    ]);
    toastSpy = jasmine.createSpyObj('NbToastrService', [
      'show'
    ]);
    TestBed.configureTestingModule({
      providers: [
        { provide: NbSidebarService, useValue: sidebarServiceSpy },
        { provide: NbDialogService, useValue: dialogServiceSpy },
        { provide: NbWindowService, useValue: windowServiceSpy },
        { provide: NbToastrService, useValue: toastSpy },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  it('should modalDialog() use dialogService', () => {
    const component = DeleteDialogComponent;
    const spy = dialogServiceSpy.open.and.callThrough();
    service.modalDialog('message test', component)

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0]).toBe(component);

  });

  it('should toggle() use sidebarService', () => {
    const spy = sidebarServiceSpy.toggle.and.callThrough();
    service.toggle()

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0]).toBe(true);

  });

  it('should modalWindow() use windowService', () => {
    const component = DeleteDialogComponent;

    const spy = windowServiceSpy.open.and.callThrough();
    service.modalWindow(component);

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);

  });

  it('should toastr() use toastService', () => {

    const spy = toastSpy.show.and.callThrough();
    service.toastr('danger', 'title test');

    expect(spy).toHaveBeenCalled();
    expect(spy.calls.count()).toBe(1);
    expect(spy.calls.first().args[0]).toBe('danger');

  });

  it('should errorMessage() use toastr method', () => {

    service.toastr('danger', 'Problem Communicating With Servers')
    service.errorMessage('error');

    expect(service.errorMessage).toMatch('Problem Communicating With Servers')

  });


});
