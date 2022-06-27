import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKindroomComponent } from './add-kindroom.component';

describe('AddKindroomComponent', () => {
  let component: AddKindroomComponent;
  let fixture: ComponentFixture<AddKindroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddKindroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKindroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
