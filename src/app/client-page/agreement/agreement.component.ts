import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { CarsService } from '../../services/cars-service/cars.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateX(-20%)',
        opacity : .8
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
export class AgreementComponent extends VehicleInfoComponent implements OnInit {
  private user: any;
  constructor(protected clientService: ClientsService, protected carsService: CarsService) {
    super(clientService, carsService);
   }

  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());

  }

  isFullData() {
    if (this.user.fulldata) {
      return true;
    } else { return false; }
  }

}
