import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbTreeGridDataSourceBuilder, NbSortRequest, NbSortDirection } from '@nebular/theme';
import { TableFacadeService } from '../../services/table-facade.service';

import { CircuitsTableComponent } from './circuits-table.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { mockLane, mockResultCircuit, mockTrack, mockTrack2 } from 'src/app/test/mocks';

describe('CircuitsTableComponent', () => {
  let component: CircuitsTableComponent;
  let fixture: ComponentFixture<CircuitsTableComponent>;
  let tableServiceSpy: jasmine.SpyObj<TableFacadeService>;
  let nbTreeGridServiceSpy: jasmine.SpyObj<NbTreeGridDataSourceBuilder<any>>;



  beforeEach(async () => {
    tableServiceSpy = jasmine.createSpyObj('TableFacadeService', [
      'edit', 'delete'
    ]);
    nbTreeGridServiceSpy = jasmine.createSpyObj('NbTreeGridDataSourceBuilder', [
      'create'
    ]);
    await TestBed.configureTestingModule({
      declarations: [CircuitsTableComponent],
      providers: [
        { provide: TableFacadeService, useValue: tableServiceSpy },
        { provide: NbTreeGridDataSourceBuilder, useValue: nbTreeGridServiceSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
    tableServiceSpy.listOfTracks$ = of(mockResultCircuit) //mock of response of pipe of observable in component
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getSortDirection() return sortDirection', () => {
    // debugger
    // component.sortDirection = NbSortDirection.ASCENDING;
    const test = component.getSortDirection('name');
    expect(test).toBe('');
  });

  it('should getSortDirection() return None', () => {
    const test = component.getSortDirection('');
    expect(test).toBe(NbSortDirection.NONE);
  });

  it('should edit() call table service ', () => {
    const spy = tableServiceSpy.edit.and.callThrough();

    component.edit(mockTrack)
    expect(spy).toHaveBeenCalledWith('Editing Circuit', mockTrack);
    expect(spy.calls.count()).toBe(1);
  });

  it('should delete() call table service ', () => {
    const spy = tableServiceSpy.delete.and.callThrough();

    component.delete(mockTrack)
    expect(spy).toHaveBeenCalledWith('Eliminate circuit', mockTrack);
  });

  it('should change value.name to "Circuit whitout name" ', () => {
    mockTrack.name = null;
    const spy = tableServiceSpy.delete.and.callThrough();

    component.delete(mockTrack)
    expect(spy).toHaveBeenCalledWith('Eliminate circuit', mockTrack);
  });


  it('should orderDataForTable return data for table if lanes is []', () => {
    const data = component.orderDataForTable(mockTrack2);
    const expected = {
      data: {
        id: 1, name: 'test track', amount_Lanes: [], kilometers: 2000,
      }
    }
    expect(data).toEqual(expected);
  });

  it('should orderDataForTable return data for table if lanes.length > 0 ', () => {
    const data = component.orderDataForTable(mockTrack);
    const expected = 
      [{
        data: { id: 1, name: 'test track', amount_Lanes: mockLane, kilometers: 2000},
        children: 
          [
            { data: { id: 1, name: 'test car', kilometers: null } },
            { data: { id: 2, name: 'test car', kilometers: null } },
            { data: { id: 3, name: 'test car', kilometers: null } },
        ]
      }]
    
    expect(data.children).toEqual(expected[0].children);
  });

});
