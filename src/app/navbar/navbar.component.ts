import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
    isLogged = false;
  private user: string;
  constructor(private clientsService : ClientsService) { }

  @ViewChild('unloggedButtons') unloggedButtons: ElementRef;
  @ViewChild('loggedButtons') loggedButtons: ElementRef;

  ngOnInit() {
    if(this.clientsService.getToken())
        this.isLogged=true;
    if (this.isLogged) {
      this.unloggedButtons.nativeElement.remove();
      this.user = JSON.parse(this.clientsService.getUserInfo());
    } else {
      this.loggedButtons.nativeElement.remove();
    }
  }

}
