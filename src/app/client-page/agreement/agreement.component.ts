import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateX(-20%)',
        opacity : .8
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
export class AgreementComponent extends VehicleInfoComponent implements OnInit {
  protected user: any
  protected totalPrice: any
  protected totalDays: any
  protected price: any;
  protected iva: any;
  protected daysXPrice: number;
  
   
  constructor(protected clientService: ClientsService, protected carsService: CarsService,calendar: NgbCalendar) {
    super(clientService,carsService,calendar);
   }

  ngOnInit() {
    super.ngOnInit();
    this.user = JSON.parse (this.clientService.getUserInfo());
    this.fromDate= JSON.parse(localStorage.getItem("fromDate"));
    this.toDate = JSON.parse(localStorage.getItem("toDate"));
    this.price = JSON.parse(localStorage.getItem("price"));
    this.totalDays =  this.TotalDays(this.toDate,this.fromDate);
    this.daysXPrice = this.totalDays * this.price ;
    this.iva = this.daysXPrice * .16;
    this.totalPrice = this.daysXPrice + this.iva;
   
    
  }
  public TotalDays(toDate,fromDate) {
    let day1 = new Date(toDate.year,toDate.month,toDate.day);
    let day2 = new Date(fromDate.year,fromDate.month,fromDate.day);
    let difference = day1.getTime()-day2.getTime();
    let totalDay = difference/1000/60/60/24;
    return totalDay;
    
  }
  isFullData() {
    if (this.user.fulldata) {
      return true;
    } else { return false; }
  }

}
