import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCircuitsComponent } from './table-circuits.component';

describe('TableCircuitsComponent', () => {
  let component: TableCircuitsComponent;
  let fixture: ComponentFixture<TableCircuitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableCircuitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCircuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
