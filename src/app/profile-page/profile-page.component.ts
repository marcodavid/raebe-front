import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';
import { RentersService } from '../services/renters-service/renters.service';
import { CarsService } from '../services/cars-service/cars.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  protected isRenter:boolean;
  protected rents: any = 0;
  protected myRents: any = 0;
  protected rentsInfo : any;
  protected clientsRents : any;
  protected status:any;
  protected totalDays:any;
  protected comments = new Array();
  protected rates = new Array();
  perfilImage = new Array();
  constructor(protected rentersService : RentersService,protected clientService: ClientsService, protected carsService : CarsService) { }
  protected user : any
  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());
    this.isRenter = this.user.isrenter == 1 ? true:false;
    this.user = JSON.parse (this.clientService.getUserInfo());
    
    this.rentersService.getRentByID(this.user.id_clients).subscribe(
      data=>{
        this.rentsInfo = data;
        for(let rent in this.rentsInfo) {
          if(this.checkDay(this.rentsInfo[rent].dateofpickup) &&  this.rentsInfo[rent].acceptence != 4  &&  this.rentsInfo[rent].acceptence != 2&&  this.rentsInfo[rent].acceptence != 5)
              this.rentsInfo[rent].acceptence = 3;
          if(this.rentsInfo[rent].acceptence != 2) {
            this.rents++;
          }
         
        }
      },
      error=>{}
    )
    this.rentersService.GetRentByIdClients(this.user.id_clients).subscribe(
      data=>{
        this.clientsRents = data;
        for(let rent in this.clientsRents) {
          this.comments.push("")
          this.rates.push("")
          if(this.clientsRents[rent].acceptence != 2) {
            this.myRents++;
           
          }
            
        }
      },
      error=>{}
    )
  }

  public checkDay(dateofpickup): boolean {
    let day = dateofpickup.split('-')
    let  myDay = new Date(day[0], day[1] - 1, day[2]);
    let today = new Date()
    today.setHours(0,0,0,0);

    if(myDay.getTime() === today.getTime())
      return true;
    else return false;
    
  }


}
