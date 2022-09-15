import { TestBed } from '@angular/core/testing';
import { MessagesService, SharedService } from 'src/app/shared/services';

import { LayoutFacadeService } from './layout-facade.service';

describe('LayoutFacadeService', () => {
  let service: LayoutFacadeService;

  beforeEach(() => {
    const messagesService = jasmine.createSpyObj('MessagesService', ['toggle']);
    const sharedService = jasmine.createSpyObj('SharedService', ['dataMenuGame$']);

    TestBed.configureTestingModule({
      providers: [
        { provide: SharedService, useValue: sharedService},
        { provide: MessagesService, useValue: messagesService},
      ]
    });
    service = TestBed.inject(LayoutFacadeService);
  });
 
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toogle be created', () => {
    service.toggle();
    expect(service.toggle).toBeTruthy();
  });


});
