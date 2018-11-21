import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyVehicleFeaturesComponent } from '../my-vehicle-features/my-vehicle-features.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';

@Component({
  selector: 'app-my-vehicle-policies',
  templateUrl: './my-vehicle-policies.component.html',
  styleUrls: ['./my-vehicle-policies.component.css'],
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
export class MyVehiclePoliciesComponent extends MyVehicleComponent implements OnInit {

  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }
  car: any
  ngOnInit() {
    super.ngOnInit()
  }

  public onSavePolicies() {

    this.car =this.userCar;

    for(var item in this.car) {
      if( item == "id_car" || item== "brand" || item== "model"  || item== "description" ||item == "year"|| item == "passagers"||item == "doors"||item == "agerestriction") 
         continue;
      else {
        if(this.car[item] == "Si" ||this.car[item] == "Automática")
            this.car[item] = 1;
        else
          this.car[item] = 0;
      }     
    }  
    this.car.id_clients = this.user.id_clients;
    if(this.userHasCar) {
      
      this.carsService.putCarForUpdate(this.car).subscribe(
        data => {
          if (data) {
            super.ngOnInit();
          }

        }
      );
     
    } else {

      this.carsService.postCar(this.car).subscribe(
        data => { 
          super.ngOnInit();
        },
        error=>{}
      );
    }
  
  }
}
