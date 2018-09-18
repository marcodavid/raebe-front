import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbyCarsComponent } from './nearby-cars.component';

describe('NearbyCarsComponent', () => {
  let component: NearbyCarsComponent;
  let fixture: ComponentFixture<NearbyCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbyCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
