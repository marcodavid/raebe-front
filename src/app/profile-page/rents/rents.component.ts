import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ProfilePageComponent } from '../profile-page.component';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import { Router } from '@angular/router';
import { CarsService } from '../../services/cars-service/cars.service';

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

  constructor(protected router: Router,protected rentersService : RentersService,protected clientService: ClientsService,protected carsService : CarsService) { 
    super(rentersService,clientService,carsService);
  }


  ngOnInit() {
    super.ngOnInit();
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
            alert("renta aceptada")

          }
        );
        break;
      case 2:
        rentToUpdate.acceptence = 2;
        this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
          data => {
            alert("renta declinada")

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

    }


  }
}
