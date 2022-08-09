import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteThePlayersComponent } from './write-the-players.component';

describe('WriteThePlayersComponent', () => {
  let component: WriteThePlayersComponent;
  let fixture: ComponentFixture<WriteThePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteThePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteThePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
