import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Evaluation } from './evaluation';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  rules         : string;

  evaluations   : Evaluation [] = [];

  constructor() { 
    this.vehicleName  = "Dodge Attitude";
    this.vehicleType  = "Automovil";
    
    this.features      = [
      "5 Pasajeros",
      "3 Maletas Grandes",
      "Transmisión Automática",
      "Aire Acondicionado",
      "18 Kilómetros por litro",
      "Bolsas de Aire",
      "Frenos Antibloqueo"
    ];

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
    
  }

}
