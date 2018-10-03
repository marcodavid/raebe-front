import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CarsService } from '../../services/cars-service/cars.service';
import { ClientsService } from '../../services/clients-service/clients.service';

@Component({
  selector: 'app-my-vehicle',
  templateUrl: './my-vehicle.component.html',
  styleUrls: ['./my-vehicle.component.css'],
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
export class MyVehicleComponent implements OnInit {

  constructor(protected clientService : ClientsService, protected carsService : CarsService) { }
  protected user: any
  protected token: any
  protected userCar: any
  protected car = {}
  ngOnInit() {

    this.token = this.clientService.getToken();
    this.user = JSON.parse(this.clientService.getUserInfo());
     this.carsService.getCarByID(this.user.id_clients).subscribe(
      data => {
        for(var item in data) {
          if( item == "id_car" || item== "brand" || item== "model"  || item== "description" || item== "automatic") 
              continue;
          else {
            if(data[item] == 1)
              data[item] = "Si" ;
            else
              data[item]= "No";
          }     
        }
    
         this.userCar = data 
      },
      error => {
        this.userCar = {
          id_car: '',
          id_clients: '',
          brand: '',
          model:'',
          year: '',
          description: '',
          specialservices: '',
          automatic: '',
          type: '',
          ac: '',
          doors: '',
          turbo: '',
          passagers: '',
          numsuitcase:'',
          kmxl: '',
          airbags:'',
          abs: '',
          costxday: '',
          averagecost: '',
          babysit: '',
          childsit: '',
          gps: '',
          agerestriction: '',
          latepolicy: '',
          rentalrestrictions: '',
          smokerestriction: '',
          audiobluetooth: '',
          audioaux: '',
          customaudio: '',
          number_4x4: '',
          sparetier: '',
          alarm: '',
          sensor: '',
        }
      }
    );

  }

 

}
