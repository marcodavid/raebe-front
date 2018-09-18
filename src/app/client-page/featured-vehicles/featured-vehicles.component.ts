import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-featured-vehicles',
  templateUrl: './featured-vehicles.component.html',
  styleUrls: ['./featured-vehicles.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateX(-10%)',
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
export class FeaturedVehiclesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
