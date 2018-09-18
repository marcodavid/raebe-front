import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyCarsMapComponent } from './nearby-cars-map.component';

describe('NearbyCarsMapComponent', () => {
  let component: NearbyCarsMapComponent;
  let fixture: ComponentFixture<NearbyCarsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyCarsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyCarsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
