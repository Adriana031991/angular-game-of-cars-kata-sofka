import { TestBed } from '@angular/core/testing';

import { CallToBackendService } from './call-to-backend.service';

describe('CallToBackendService', () => {
  let service: CallToBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallToBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
