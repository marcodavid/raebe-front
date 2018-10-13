import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';

@Component({
  selector: 'app-my-vehicle-features',
  templateUrl: './my-vehicle-features.component.html',
  styleUrls: ['./my-vehicle-features.component.css'],
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
export class MyVehicleFeaturesComponent extends MyVehicleComponent implements OnInit  {
  
  car: any
  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }

  ngOnInit() {
    super.ngOnInit()
  }

  public onSaveCar() {

    this.car =this.userCar;

    for(var item in this.car) {
      if( item == "id_car" || item== "brand" || item== "model"  || item== "description" ||item == "year"|| item == "passagers"||item == "doors") 
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
            alert("Carro actualizado, cambiar este mensaje por uno mejor")
            super.ngOnInit();
          }

        }
      );
     
    } else {

      this.carsService.postCar(this.car).subscribe(
        data => { 
          alert("Carro creado, cambiar este mensaje por uno mejor")
          super.ngOnInit();
        },
        error=>{alert("nel")}
      );
    }
  
  }
  
}
