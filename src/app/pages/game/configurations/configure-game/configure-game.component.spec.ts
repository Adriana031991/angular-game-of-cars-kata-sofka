import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureGameComponent } from './configure-game.component';

describe('ConfigureGameComponent', () => {
  let component: ConfigureGameComponent;
  let fixture: ComponentFixture<ConfigureGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
