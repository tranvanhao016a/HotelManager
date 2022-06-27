import { TestBed } from '@angular/core/testing';

import { ServiecService } from './serviec.service';

describe('ServiecService', () => {
  let service: ServiecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
