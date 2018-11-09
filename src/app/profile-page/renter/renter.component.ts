import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RentersService } from '../../services/renters-service/renters.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import { forEach } from '@angular/router/src/utils/collection';
import { ProfilePageComponent } from '../profile-page.component';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css'],
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
export class RenterComponent extends ProfilePageComponent implements OnInit {
  protected user: any;
  protected cont = 0;
  constructor(protected rentersService : RentersService,protected clientService: ClientsService) { 
    super(rentersService,clientService);
  }

  ngOnInit() {
    super.ngOnInit();
    
  }

  public onAcceptence(status,rentToUpdate) {
    if(status) {
      rentToUpdate.acceptence = 1;
      this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
        data=>{
          alert("renta aceptada")

        }
      );
    } else {
      rentToUpdate.acceptence = 2;
      this.rentersService.putRentForUpdate(rentToUpdate).subscribe(
        data=>{
          alert("renta declinada")

        }
      );
    }
  } 
}
