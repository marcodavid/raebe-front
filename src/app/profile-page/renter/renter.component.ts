import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import * as $ from 'jquery';
import { ProfilePageComponent } from '../profile-page.component';
import { CarsService } from '../../services/cars-service/cars.service';

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
  protected user: any;
  protected secure:false;
  protected cont = 0;
  protected today = new Date();
  protected dd = this.today.getDate();
  protected mm = this.today.getMonth() + 1;
  protected yyyy = this.today.getFullYear();
  constructor(protected rentersService: RentersService, protected clientService: ClientsService,protected carsService:CarsService) {
    super(rentersService, clientService,carsService);
  }

  ngOnInit() {
    super.ngOnInit();
   

  }



  public onAcceptence(status, rentToUpdate) {
    switch (status) {

      case 1:
        rentToUpdate.acceptence = 1;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {

            alert("renta aceptada")
            this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de aceptar una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
              data=>{
                
              }
            );
          }
        );
        break;
      case 2:
        rentToUpdate.acceptence = 2;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
           
            this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de declinar una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
              data=>{
                
              }
            );
          }
        );
        break;
      case 3:
        rentToUpdate.acceptence = 4;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            alert("renta en progreso")
            

          }
        );
        break;
        case 5:
        rentToUpdate.acceptence = 5;//3 lista,4 iniciada
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            alert("renta terminada")
            this.rentersService.postMail(this.user.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acabas de finalizar  una renta para el usuario "+rentToUpdate.clientname+"<br>para mas información click <a>aquí</a>","Notificación de renta RaeBe").subscribe(
              data=>{
              }
            );
          }
        );
        break;

    }


  }
}

