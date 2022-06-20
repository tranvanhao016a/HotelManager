import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomvouchersComponent } from './add-roomvouchers.component';

describe('AddRoomvouchersComponent', () => {
  let component: AddRoomvouchersComponent;
  let fixture: ComponentFixture<AddRoomvouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRoomvouchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomvouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
