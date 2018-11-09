import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';
import { RentersService } from '../services/renters-service/renters.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  protected isRenter:boolean;
  protected rents: any = 0;
  protected rentsInfo : any;
  protected status:any;
  constructor(protected rentersService : RentersService,protected clientService: ClientsService) { }
  protected user : any
  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());
    this.isRenter = this.user.isrenter == 1 ? true:false;
    this.user = JSON.parse (this.clientService.getUserInfo());
    this.rentersService.getRentByID(this.user.id_clients).subscribe(
      data=>{
        this.rentsInfo = data;
        for(let rent in this.rentsInfo) {
          if(this.rentsInfo[rent].acceptence == 0) {
            this.rents++;
          }
            
        }
      },
      error=>{}
    )
  }


}
