import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        backgroundColor: '#f48fb1',
        transform : 'translateY(-5%)',
        opacity : .8
      })),
      transition(':enter', [
        animate(200, style({
          backgroundColor: '#f48fb1',
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class BannerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
