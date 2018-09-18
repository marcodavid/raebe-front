import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterPageComponent } from './renter-page.component';

describe('RenterPageComponent', () => {
  let component: RenterPageComponent;
  let fixture: ComponentFixture<RenterPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenterPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
