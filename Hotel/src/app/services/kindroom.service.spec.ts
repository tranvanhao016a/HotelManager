import { TestBed } from '@angular/core/testing';

import { KindroomService } from './kindroom.service';

describe('KindroomService', () => {
  let service: KindroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
