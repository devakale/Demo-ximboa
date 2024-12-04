import { TestBed } from '@angular/core/testing';

import { RealoadServiceService } from './reaload-service.service';

describe('RealoadServiceService', () => {
  let service: RealoadServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealoadServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
