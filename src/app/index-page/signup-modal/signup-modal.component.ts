import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients-service/clients.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  user: any;
  constructor(public clientsService: ClientsService,public router:Router) { }
 //models
  client  = {
    firstname: "" ,
    lastname: "" ,
    email:"" ,
    isrenter:0 ,
    age:'' ,//toDo change this column in db
    curp:"" ,
    telnumber:0,
    lada:0,
    telcountry:"",
    id_address:0,
    imgprofilephoto:"" ,
    fulldata: 0,
    password:""
  }
    
    address = {
      id_address:0,
      id_clients:0,
      zipcode:0,
      country:"",
      state:"",
      province:"",
      numint:0,
      numext:0,
      street:"",
      city:"",
    }

    driverLicense = {
      id_clients:0,
      id_driverLicense:0,
      licensenum:0,
      startdate:"",
      enddate:"",

    }
   
  ngOnInit() {
    
  }

  onSign() {
   
    this.clientsService.postClientToSign(this.client).subscribe(
      data => {
        
        this.clientsService.setToken(data['token']); 
        this.clientsService.setUserInfo(data['data']);        
        this.user = JSON.parse(this.clientsService.getUserInfo());
        this.address.id_clients = this.user.id_clients;
        this.driverLicense.id_clients = this.user.id_clients;
        this.clientsService.postAddress(this.address).subscribe(
            data => {
              if(data)
              this.clientsService.postDriverLicense(this.driverLicense).subscribe(
                data => {
                  if(data)
                    location.reload();
                }
              );

            }
        );
        //location.reload();
      }
    ); 
  }

}
