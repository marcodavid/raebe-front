import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, transition, animate, state} from '@angular/animations';

@Component({
  selector: 'app-renter-page',
  templateUrl: './renter-page.component.html',
  styleUrls: ['./renter-page.component.css']
})
export class RenterPageComponent implements OnInit {

  constructor (private activatedRoute: ActivatedRoute) {
    this.activatedRoute.url.subscribe(url => {
      console.log(url);
    });
  }

  ngOnInit() { }

}
