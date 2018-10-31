import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.css']
})
export class CarCardComponent implements OnInit {
  /*
  @ViewChild('verticalCard') verticalCard : ElementRef;
  @ViewChild('horizontalCard') horizontalCard : ElementRef;
  */

  @Input() img: string;
  brandmark: string;
  model: string;
  description: string;
  cardStyle: any;

  constructor() {
    this.brandmark = 'Marca';
    this.model = 'Modelo';
    this.description = 'Esto es una descripción corta de prueba para el vehículo';
  }

  ngOnInit() {
    this.cardStyle = {
      'background-image' : 'url(\'/assets/img/' + this.img + '\')'
    };
    /*if(this.horizontal){
        this.verticalCard.nativeElement.remove();
    } else {
      this.horizontalCard.nativeElement.remove();
    }*/
  }
}
