import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients-service/clients.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent implements OnInit {

  constructor(private clientsService: ClientsService,private router:Router) { }
//model to use
  json  = {
   firstname: "" ,
   lastname: "" ,
   email:"" ,
   password:"" ,
   isrenter:0 ,
   age:'1999-12-09' ,//toDo change this column in db
   curp:"needs to update" ,
   id_address:0 ,
   imgprofilephoto:"needs to update" ,
   fulldata: 0  }
  
  
  ngOnInit() {
  }

  onSign() {
    this.clientsService.postClientToSign(this.json).subscribe(
      data => {
        this.clientsService.setToken(data['token']); 
        this.clientsService.setUserInfo(data['data']);
        location.reload();
      }
    ); 
    if(this.clientsService.getAuthToken()) {
     
      this.router.navigate(['profile']);
    }
  }

}
