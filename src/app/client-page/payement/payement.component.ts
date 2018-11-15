import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { AgreementComponent } from '../agreement/agreement.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RentersService } from '../../services/renters-service/renters.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css'],
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
export class PayementComponent extends AgreementComponent implements OnInit {
  renterCar:any
  rent = {
    id_clients :0,
    id_clientsrenter :0,
    clientname:"",
    id_car :0,
    dateofpickup :"",
    returnday :"",
    discount :0,
    acceptence :0,
    starttime :0,
    endtime :0,
    rentedtime :0,
    approvalextension :0,
    extendedtime :0,
    id_penalty :0,
    isover :0,
    price: 0,
    iva:0,
    totaldays:0,
    pricexiva:0,
    totalprice :0,
    gain:0
  }
  constructor(protected router: Router,protected clientService: ClientsService, protected carsService: CarsService,calendar: NgbCalendar,  protected renterServie:RentersService) {
    super(clientService,carsService,calendar,renterServie);
   }

  ngOnInit() {

    super.ngOnInit();
    this.carsService.getCarByID(this.clientSelected).subscribe(
      data => { 
        this.renterCar = data;
        this.rent.id_clients = this.user.id_clients;
        this.rent.clientname = this.user.firstname +" "+this.user.lastname+" "+"Edad:"+" "+this.user.age;
        this.rent.id_clientsrenter = this.clientSelected;
        this.rent.id_car =this.renterCar.id_car;
        this.rent.dateofpickup = this.fromDate.year+"-"+this.fromDate.month + "-"+this.fromDate.day;
        this.rent.returnday = this.toDate.year+"-"+this.toDate.month+"-"+this.toDate.day;
        this.rent.price = this.price;
        this.rent.iva = this.iva;
        this.rent.pricexiva=this.daysXPrice;
        this.rent.totalprice = this.totalPrice;
        this.rent.totaldays = this.totalDays;
        this.rent.gain= this.totalPrice-this.iva - (this.totalPrice*.2);
    });
   

  }

  public onRent() {
       this.renterServie.PostRent(this.rent).subscribe(
         data=>{
          this.router.navigate(['/profile/rents']);
         }
       );
  


  }

}
