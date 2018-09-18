import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterIndexComponent } from './renter-index.component';

describe('RenterIndexComponent', () => {
  let component: RenterIndexComponent;
  let fixture: ComponentFixture<RenterIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
