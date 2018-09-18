import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiclePoliciesComponent } from './my-vehicle-policies.component';

describe('MyVehiclePoliciesComponent', () => {
  let component: MyVehiclePoliciesComponent;
  let fixture: ComponentFixture<MyVehiclePoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehiclePoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehiclePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
