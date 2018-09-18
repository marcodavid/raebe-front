import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehiclePricesComponent } from './my-vehicle-prices.component';

describe('MyVehiclePricesComponent', () => {
  let component: MyVehiclePricesComponent;
  let fixture: ComponentFixture<MyVehiclePricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehiclePricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehiclePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
