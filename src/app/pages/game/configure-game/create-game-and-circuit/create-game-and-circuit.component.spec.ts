import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGameAndCircuitComponent } from './create-game-and-circuit.component';

describe('CreateGameAndCircuitComponent', () => {
  let component: CreateGameAndCircuitComponent;
  let fixture: ComponentFixture<CreateGameAndCircuitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGameAndCircuitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGameAndCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
