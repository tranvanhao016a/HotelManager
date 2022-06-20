import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomvouchersComponent } from './roomvouchers.component';

describe('RoomvouchersComponent', () => {
  let component: RoomvouchersComponent;
  let fixture: ComponentFixture<RoomvouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomvouchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomvouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
