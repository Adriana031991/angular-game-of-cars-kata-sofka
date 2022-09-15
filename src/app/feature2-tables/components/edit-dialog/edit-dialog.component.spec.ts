import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbDialogRef } from '@nebular/theme';
import { TableFacadeService } from '../../services/table-facade.service';

import { EditDialogComponent } from './edit-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { mockDataPlayers, mockNewPlayerInterface, mockPlayer, mockResultObservableShareDataConfig, mockTrack } from 'src/app/test/mocks';
import { of } from 'rxjs';

describe('EditDialogComponent', () => {
  let component: EditDialogComponent;
  let fixture: ComponentFixture<EditDialogComponent>;
  let tableServiceSpy: jasmine.SpyObj<TableFacadeService>;
  let refSpy: jasmine.SpyObj<NbDialogRef<EditDialogComponent>>

  beforeEach(async () => {

    tableServiceSpy = jasmine.createSpyObj('TableFacadeService', [
      'updateCircuit', 'savePlayer'
    ]);
    refSpy = jasmine.createSpyObj('NbDialogRef', [
      'close'
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditDialogComponent],
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
    fixture = TestBed.createComponent(EditDialogComponent);
    component = fixture.componentInstance;
    component.title = 'Testing';
    component.data = mockTrack;
    component.data = mockPlayer;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  
  
  it('should savePlayer() call tableService with data', () => {
    component.data = mockPlayer;
    const spy = tableServiceSpy.savePlayer.and.callThrough();
    component.savePlayer();
    expect(spy).toHaveBeenCalledWith(mockNewPlayerInterface, mockDataPlayers);

  });


  it('should updateCircuit() call tableService with data', () => {
    // component.data = mockTrack;
    const spy = tableServiceSpy.updateCircuit.and.callThrough();
    component.updateCircuit();
    expect(spy).toHaveBeenCalled();

  });

});
