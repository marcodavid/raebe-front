import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProfilePageComponent } from '../profile-page.component';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import { Router } from '@angular/router';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-rents',
  templateUrl: './rents.component.html',
  styleUrls: ['./rents.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateY(-5%)',
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
export class RentsComponent extends ProfilePageComponent implements OnInit {
  myRate = {
    id_clientsreceiver:"",
    id_clientscommenter:"",
    comment:"",
    rate:"" 

  }
  readonly = false;

  constructor(public spinner: NgxSpinnerService,public router: Router,public rentersService : RentersService,public clientService: ClientsService,public carsService : CarsService) { 
    super(spinner,rentersService,clientService,carsService);
  }


  ngOnInit() {
    super.ngOnInit();
  }


  public onRate(rent,index) {
    this.myRate.id_clientsreceiver = rent.id_clients;
    this.myRate.id_clientscommenter = this.user.id_clients;
    this.myRate.comment = this.comments[index];
    this.myRate.rate = this.rates[index]; 
    this.rentersService.postRate(this.myRate).subscribe(
      data=>{
        rent.acceptence = 2
        this.rentersService.putRentForUpdate(rent).subscribe(
          data => {

          }
        );
      }
    )
  }
  public setClient(id_clientRenter){
    localStorage.setItem(id_clientRenter,"clientSelected");
    this.router.navigate(['/client/vehicle-info']);
  }
  public onAcceptence(status, rentToUpdate) {
    switch (status) {

      case 1:
        rentToUpdate.acceptence = 1;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {

          }
        );
        break;
      case 2:
        rentToUpdate.acceptence = 2;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {

          }
        );
        break;
      case 3:
        rentToUpdate.acceptence = 4;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {

          }
        );
        break;
        case 5:
        rentToUpdate.acceptence = 5;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {

          }
        );
        break;

    }


  }
}
