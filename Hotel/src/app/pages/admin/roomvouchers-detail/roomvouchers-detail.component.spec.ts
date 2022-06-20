import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomvouchersDetailComponent } from './roomvouchers-detail.component';

describe('RoomvouchersDetailComponent', () => {
  let component: RoomvouchersDetailComponent;
  let fixture: ComponentFixture<RoomvouchersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomvouchersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomvouchersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
