import { TestBed } from '@angular/core/testing';

import { RoomvoucherService } from './roomvoucher.service';

describe('RoomvoucherService', () => {
  let service: RoomvoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomvoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
