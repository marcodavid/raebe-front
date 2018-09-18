import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  @Input()
    horizontal : boolean;

  @ViewChild('verticalCard') verticalCard : ElementRef;
  @ViewChild('horizontalCard') horizontalCard : ElementRef;

  img           : string;
  brandmark     : string;
  model         : string;
  description   : string;

  constructor() { 
    this.img          = '/assets/img/example_1.jpg';
    this.brandmark    = 'Marca';
    this.model        = "Modelo";
    this.description  = "Esto es una descripción corta de prueba para el vehículo";
  }

  ngOnInit() {
    if(this.horizontal){
        this.verticalCard.nativeElement.remove();
    } else {
      this.horizontalCard.nativeElement.remove();
    }
  }
}
