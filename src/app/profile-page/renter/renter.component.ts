import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import * as $ from 'jquery';
import { ProfilePageComponent } from '../profile-page.component';

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
  protected cont = 0;
  protected today = new Date();
  protected dd = this.today.getDate();
  protected mm = this.today.getMonth() + 1;
  protected yyyy = this.today.getFullYear();
  constructor(protected rentersService: RentersService, protected clientService: ClientsService) {
    super(rentersService, clientService);
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

