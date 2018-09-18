import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehicleExtrasComponent } from './my-vehicle-extras.component';

describe('MyVehicleExtrasComponent', () => {
  let component: MyVehicleExtrasComponent;
  let fixture: ComponentFixture<MyVehicleExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehicleExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehicleExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
