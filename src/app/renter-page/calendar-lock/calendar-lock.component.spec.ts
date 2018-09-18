import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarLockComponent } from './calendar-lock.component';

describe('CalendarLockComponent', () => {
  let component: CalendarLockComponent;
  let fixture: ComponentFixture<CalendarLockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarLockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarLockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
