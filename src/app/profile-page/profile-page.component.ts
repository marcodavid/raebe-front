import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private clientService:ClientsService) { }
  private user : any
  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());
  }


}
