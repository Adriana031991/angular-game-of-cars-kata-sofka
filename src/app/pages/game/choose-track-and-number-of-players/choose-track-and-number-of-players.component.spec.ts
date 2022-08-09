import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTrackAndNumberOfPlayersComponent } from './choose-track-and-number-of-players.component';

describe('ChooseTrackAndNumberOfPlayersComponent', () => {
  let component: ChooseTrackAndNumberOfPlayersComponent;
  let fixture: ComponentFixture<ChooseTrackAndNumberOfPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTrackAndNumberOfPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTrackAndNumberOfPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
