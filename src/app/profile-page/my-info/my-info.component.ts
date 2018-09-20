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
  json  = {
    firstname: "" ,
    lastname: "" ,
    email:"" ,
    isrenter:0 ,
    age:'' ,//toDo change this column in db
    curp:"" ,
    id_address:0 ,
    imgprofilephoto:"" ,
    fulldata: 0  }
   
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

    if(this.json.firstname != "") {
      this.user.firstname = this.json.firstname;

    }
    
    if(this.json.lastname != "") {
      this.user.lastname = this.json.lastname;

    }
    
    if(this.json.email != "") {
      this.user.email = this.json.email;

    }
  
    if(this.json.curp != "") {
      this.user.curp = this.json.curp;

    }
    
    if(this.json.age != "") {
      this.user.age = this.json.age;

    }
  }
  public logOut() {   
    localStorage.clear();
    location.reload();
  }
}
