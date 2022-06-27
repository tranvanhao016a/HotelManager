import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindroomComponent } from './kindroom.component';

describe('KindroomComponent', () => {
  let component: KindroomComponent;
  let fixture: ComponentFixture<KindroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KindroomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KindroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
