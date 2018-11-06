import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Evaluation } from './evaluation';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateX(-20%)',
        opacity : .8
      })),
      transition(':enter', [
        animate(200, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class VehicleInfoComponent implements OnInit {
  image         : string;
  vehicleName   : string;
  vehicleType   : string;
  features      : string [];
  description         : string;
  clientSelected: any
  clientSelectedCar: any
  evaluations   : Evaluation [] = [];

  constructor(protected clientService: ClientsService, protected carsService: CarsService) {  
    this.vehicleName  = "Dodge Attitude";
    this.vehicleType  = "Automovil";
    
    this.features = [];

    this.evaluations.push({
      username : "Samuel",
      value : 9.6,
      date : "7 Junio 2018",
      comment : "Mucho mejor de lo que esperaba"
    });

    this.evaluations.push({
      username : "Samuel",
      value : 9.6,
      date : "7 Junio 2018",
      comment : "Mucho mejor de lo que esperaba"
    });

  }

  ngOnInit() {
    this.clientSelected = localStorage.getItem("clientSelected");
    this.loadDescription(this.clientSelected);


  }
  public loadDescription(clientSelected) {
   
    this.carsService.getCarByID(clientSelected).subscribe(
      data => {
          this.clientSelectedCar = data
          this.vehicleName =  this.clientSelectedCar.model;
          this.vehicleType = this.clientSelectedCar.brand;
          
          if( this.clientSelectedCar["automatic"] == 1)
             this.clientSelectedCar["automatic"] = "automática";
          else 
             this.clientSelectedCar["automatic"] = "manual";
          
          for(var item in  this.clientSelectedCar) {
            if( item == "id_car" || item== "brand" || item== "model"  || item== "description" || item== "automatic"||item == "year"|| item == "passagers"||item == "doors"||item == "agerestriction"||item=="price")
              continue;
            else {
              if( this.clientSelectedCar[item] == 1)
                 this.clientSelectedCar[item] = " Sí" ;
              else
                 this.clientSelectedCar[item]=   "No";
            }     
          }
          this.carsService.getCarImagesByID(clientSelected).subscribe(
          data => {
            this.image= '//' + this.clientService.getServer() + data[0].file

          });

          this.features.push(
            "Edad de restricción para el conductor:   "+ this.clientSelectedCar["agerestriction"]+" años",
            "Tranmisión   "+ this.clientSelectedCar["automatic"],
            "Año:  "+this.clientSelectedCar["year"],
            "Pasajeros:  "+this.clientSelectedCar["passagers"],
            "Puertas:  "+this.clientSelectedCar["doors"],
            "Aire acondicionado:  " + this.clientSelectedCar["ac"],
            "Audio auxiliar:  " + this.clientSelectedCar["audioaux"],
            "Audio bluetooth:  " + this.clientSelectedCar["audiobluetooth "],
            "Turbo:  " + this.clientSelectedCar["turbo"],
            "Bolsas de aire:  " + this.clientSelectedCar["airbags"],
            "Asiento de bebé: " + this.clientSelectedCar["babysit"],
            "Asiento de infante:  " + this.clientSelectedCar["childsit"],
            "GPS: " + this.clientSelectedCar["gps"],
            "Restriccion de fumar:  " + this.clientSelectedCar["smokerestriction"],
            "Espacio para maletas:  " + this.clientSelectedCar["numsuitcase"],
            "Alarma:  " + this.clientSelectedCar["alarm"],
            "Sensor de proximidad:  "+ this.clientSelectedCar["sensor"],
            "Capota:  "+ this.clientSelectedCar["sparetier"],
          )
          this.description = this.clientSelectedCar["description"]

      });
  }
}
