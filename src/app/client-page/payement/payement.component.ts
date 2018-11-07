import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { AgreementComponent } from '../agreement/agreement.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'],
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
export class PayementComponent extends AgreementComponent implements OnInit {

  constructor(protected clientService: ClientsService, protected carsService: CarsService,calendar: NgbCalendar) {
    super(clientService,carsService,calendar);
   }

  ngOnInit() {
    super.ngOnInit();
  }

}
