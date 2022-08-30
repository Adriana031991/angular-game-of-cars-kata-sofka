import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitsTableComponent } from './circuits-table.component';

describe('CircuitsTableComponent', () => {
  let component: CircuitsTableComponent;
  let fixture: ComponentFixture<CircuitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
