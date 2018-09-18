import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehicleInsuranceComponent } from './my-vehicle-insurance.component';

describe('MyVehicleInsuranceComponent', () => {
  let component: MyVehicleInsuranceComponent;
  let fixture: ComponentFixture<MyVehicleInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehicleInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehicleInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
