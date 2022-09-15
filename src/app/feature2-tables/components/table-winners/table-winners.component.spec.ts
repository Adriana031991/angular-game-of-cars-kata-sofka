import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CallToBackendService, RoutesFacadeService } from 'src/app/shared/services';

import { TableWinnersComponent } from './table-winners.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TableWinnersComponent', () => {
  let component: TableWinnersComponent;
  let fixture: ComponentFixture<TableWinnersComponent>;
  // let serverServiceSpy: jasmine.SpyObj<CallToBackendService>;
  // let routerServiceSpy: jasmine.SpyObj<RoutesFacadeService>;
  let nbTreeGridServiceSpy: jasmine.SpyObj<NbTreeGridDataSourceBuilder<any>>;



  beforeEach(async () => {
    // serverServiceSpy = jasmine.createSpyObj('CallToBackendService', [
      
    // ]);
    // routerServiceSpy = jasmine.createSpyObj('RoutesFacadeService', [
      
    // ]);
    nbTreeGridServiceSpy = jasmine.createSpyObj('NbTreeGridDataSourceBuilder', [
      'create'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ TableWinnersComponent ],
      providers: [
        // { provide: CallToBackendService, useValue: serverServiceSpy },
        // { provide: RoutesFacadeService, useValue: routerServiceSpy },
        { provide: NbTreeGridDataSourceBuilder, useValue: nbTreeGridServiceSpy }

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
