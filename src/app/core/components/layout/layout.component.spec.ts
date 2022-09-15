import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutFacadeService } from '../../services/layout-facade.service';

import { LayoutComponent } from './layout.component';


describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    const layoutFacade = jasmine.createSpyObj('LayoutFacadeService', ['toggle']);

    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [ RouterTestingModule],
      providers: [
        { provide: LayoutFacadeService, useValue: layoutFacade},
      ]
        
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toogle be true', () => {
    component.toggle()
    expect(component.toggle).toBeTruthy();
  });




});
