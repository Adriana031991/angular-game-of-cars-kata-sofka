import { TestBed } from '@angular/core/testing';
import { mockResultGame, mockResultObservableShareDataConfig } from 'src/app/test/mocks';

import { SharedService } from './shared.service';

describe('SelectItemService', () => {
  let service: SharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit result of game', () => {
    service.sharedResultGame(mockResultGame);
    service.resultGame$.subscribe(
      res => 
      expect(res).toBe(mockResultGame)
    )
  });

  it('should emit data of route for breadcrumbs', () => {
    service.sharedMenuGame('test breadcrumb');
    service.dataMenuGame$.subscribe(
      res => 
      expect(res).toContain('bread')
    )
  });

  it('should emit configurations of game', () => {
    service.SharedConfigureForm(mockResultObservableShareDataConfig);
    service.configureFormSubject$.subscribe(
      res => 
      expect(res).toBe(mockResultObservableShareDataConfig)
    )
  });



});
