import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehicleCalendarComponent } from './my-vehicle-calendar.component';

describe('MyVehicleCalendarComponent', () => {
  let component: MyVehicleCalendarComponent;
  let fixture: ComponentFixture<MyVehicleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehicleCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehicleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
