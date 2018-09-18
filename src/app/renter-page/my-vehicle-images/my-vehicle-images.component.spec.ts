import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVehicleImagesComponent } from './my-vehicle-images.component';

describe('MyVehicleImagesComponent', () => {
  let component: MyVehicleImagesComponent;
  let fixture: ComponentFixture<MyVehicleImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVehicleImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVehicleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
