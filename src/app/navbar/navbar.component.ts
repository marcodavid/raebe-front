import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
    isLogged = false;
  constructor() { }

  @ViewChild('unloggedButtons') unloggedButtons: ElementRef;
  @ViewChild('loggedButtons') loggedButtons: ElementRef;

  ngOnInit() {
    if (this.isLogged) {
      this.unloggedButtons.nativeElement.remove();
    } else {
      this.loggedButtons.nativeElement.remove();
    }
  }

}
