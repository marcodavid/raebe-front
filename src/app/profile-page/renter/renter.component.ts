import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import * as $ from 'jquery';
import { ProfilePageComponent } from '../profile-page.component';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css'],
  animations: [
    trigger('animacionAparecer', [
      state('void', style({
        transform: 'translateY(-5%)',
        opacity: .5
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
export class RenterComponent extends ProfilePageComponent implements OnInit {
  public user: any;
  public secure:false;
  public cont = 0;
  public today = new Date();
  public dd = this.today.getDate();
  public mm = this.today.getMonth() + 1;
  public yyyy = this.today.getFullYear();
  public reabeSecure =  "";
  constructor(public spinner: NgxSpinnerService,public rentersService: RentersService, public clientService: ClientsService,public carsService:CarsService) {
    super(spinner,rentersService, clientService,carsService);
  }

  ngOnInit() {
    super.ngOnInit();
   

  }



  public onAcceptence(status, rentToUpdate) {
    this.spinner.show();

    switch (status) {
      case 1:
        rentToUpdate.acceptence = 1;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            this.spinner.hide();
            // this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de aceptar una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
            //   data=>{
            //     this.spinner.hide();
            //   }
            // );
          }
        );
        break;
      case 2:
        this.spinner.hide();
        rentToUpdate.acceptence = 2;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            location.reload();
            // this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de declinar una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
            //   data=>{
            //     this.spinner.hide();
            //    location.reload();
            //   }
            // );
          }
        );
        break;
      case 3:
        rentToUpdate.acceptence = 4;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            
            this.spinner.hide();
          }
        );
        break;
        case 5:
        
        this.spinner.hide();
        rentToUpdate.acceptence = 5;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            location.reload();
            // this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de finalizar  una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
            //   data=>{
            //     this.spinner.hide();
            //     location.reload();
            //   }
            // );
          }
        );
        break;

    }


  }
}

