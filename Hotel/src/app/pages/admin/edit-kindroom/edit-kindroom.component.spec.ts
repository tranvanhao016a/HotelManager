import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKindroomComponent } from './edit-kindroom.component';

describe('EditKindroomComponent', () => {
  let component: EditKindroomComponent;
  let fixture: ComponentFixture<EditKindroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKindroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKindroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
