import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
export class MyVehicleFeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
