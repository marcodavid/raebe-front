import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehicleFeaturesComponent } from './my-vehicle-features.component';

describe('MyVehicleFeaturesComponent', () => {
  let component: MyVehicleFeaturesComponent;
  let fixture: ComponentFixture<MyVehicleFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehicleFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehicleFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
