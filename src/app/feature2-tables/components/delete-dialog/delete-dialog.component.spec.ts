import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbDialogRef } from '@nebular/theme';
import { of } from 'rxjs';
import { mockDataPlayers, mockResultObservableShareDataConfig, mockTrack } from 'src/app/test/mocks';
import { TableFacadeService } from '../../services/table-facade.service';

import { DeleteDialogComponent } from './delete-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  let tableServiceSpy: jasmine.SpyObj<TableFacadeService>;
  let refSpy: jasmine.SpyObj<NbDialogRef<DeleteDialogComponent>>

  beforeEach(async () => {
    tableServiceSpy = jasmine.createSpyObj('TableFacadeService', [
      'deleteCircuit', 'deletePlayer'
    ]);
    refSpy = jasmine.createSpyObj('NbDialogRef', [
      'close'
    ]);

    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      providers: [
        { provide: TableFacadeService, useValue: tableServiceSpy },
        { provide: NbDialogRef, useValue: refSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    tableServiceSpy.configureForm$ = of(mockResultObservableShareDataConfig) //mock of response of pipe of observable in component
    
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    component.title = 'Testing';
    component.data = mockTrack;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deletePlayer() call tableService with data', () => {
    const spy = tableServiceSpy.deletePlayer.and.callThrough();
    component.deletePlayer();
    expect(spy).toHaveBeenCalledWith(1, mockDataPlayers);

  });

  it('should deleteCircuit() call tableService with data', () => {
    const spy = tableServiceSpy.deleteCircuit.and.callThrough();
    component.deleteCircuit();
    expect(spy).toHaveBeenCalledWith(1, mockTrack.name!);

  });

});
