import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';

@Component({
  selector: 'app-my-vehicle-insurance',
  templateUrl: './my-vehicle-insurance.component.html',
  styleUrls: ['./my-vehicle-insurance.component.css'],
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
export class MyVehicleInsuranceComponent extends MyVehicleComponent implements OnInit  {
  
  protected policy: any
  
  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }

  ngOnInit() {
    super.ngOnInit();
   

  }

  public onSavePolicy()  {
    if(this.userCarHasPolicy) {
        this.carsService.putPolicyForUpdate(this.userPolicy).subscribe(
          data => {
            alert("guardado, poliza actualizada")
          },
          error => {
            alert("nel")
          }
        );
    } else {
      this.userPolicy.id_car = this.userCar.id_car;
      this.carsService.postPolicy(this.userPolicy).subscribe(
        data => {
          alert("guardado, poliza creada")
        },
        error => {
          alert("nel")
        }
      );
    }
  }

}
