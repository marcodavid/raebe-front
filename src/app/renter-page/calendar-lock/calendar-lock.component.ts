import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-lock',
  templateUrl: './calendar-lock.component.html',
  styleUrls: ['./calendar-lock.component.css']
})
export class CalendarLockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSaveCalendarLock() {
    console.log('Esto debería funcionar');
  }

}
