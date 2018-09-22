import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateY(-10%)',
        opacity : .5
      })),
      transition(':enter', [
        animate(500, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class MyInfoComponent implements OnInit {

 
  constructor(private clientService: ClientsService) { }
  private user : any
  private token : any
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
    id_address:0 ,
    imgprofilephoto:"" ,
    fulldata: 0  }
    
    address = {
      id_address:0,
      zipcode:"",
      country:"",
      state:"",
      province:"",
      numint:""
    }

    driverlicense = {
      id_driverlicense:0,
      id_clients:0,
      licensenumber:0,
      startday:0,
      endday:0

    }
  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());
    this.token = this.clientService.getToken();

  }

  public saveInfo() {
    this.validateChanges()
   // console.log(this.clientService.getUserInfo() + "" + this.token)
   this.clientService.putClientForUpdate(this.user);
  }
  
  public validateChanges() {

    if(this.client.firstname != "") {
      this.user.firstname = this.client.firstname;

    }
    
    if(this.client.lastname != "") {
      this.user.lastname = this.client.lastname;

    }
    
    if(this.client.email != "") {
      this.user.email = this.client.email;

    }
  
    if(this.client.curp != "") {
      this.user.curp = this.client.curp;

    }
    
    if(this.client.age != "") {
      this.user.age = this.client.age;

    }
  }
  public logOut() {   
    localStorage.clear();
    location.reload();
  }
}
