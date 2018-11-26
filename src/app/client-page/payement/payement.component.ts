import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VehicleInfoComponent } from '../vehicle-info/vehicle-info.component';
import { AgreementComponent } from '../agreement/agreement.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { RentersService } from '../../services/renters-service/renters.service';
import { Router } from '@angular/router';
import { PayPalConfig, PayPalEnvironment, PayPalIntegrationType } from 'ngx-paypal';
import { NgxSpinnerService } from 'ngx-spinner';

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
  client:any
  public payPalConfig?: PayPalConfig;
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
  constructor(public spinner: NgxSpinnerService,public router: Router,public clientService: ClientsService, public carsService: CarsService,calendar: NgbCalendar,  public renterServie:RentersService) {
    super(spinner,clientService,carsService,calendar,renterServie);
   }

  ngOnInit() {
    
    super.ngOnInit();
    this.spinner.show();
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
        this.spinner.hide();
    });
    this.clientService.getClientsByID(this.clientSelected).subscribe(
      data=>{this.client = data}
    );
    this.initConfig();

  }

  public onRent() {
    this.spinner.show();
       this.renterServie.PostRent(this.rent).subscribe(
         data=>{
          this.router.navigate(['/profile/rents']);

          // this.rentersService.postMail(this.client.email,"<h3>Hola "+this.user.firstname+"!</h3><br>Acaban de proponerte una renta  para el usuario "+this.user.firstname+"<br>para mas información click <a href='https://raebe.azurewebsites.net/profile/renter'>aquí</a>","Notificación de renta RaeBe").subscribe(
          //   data=>{
              
          //   });
         }
          );
      
      //     this.renterService.postMail(this.user.email,"<h3>Gracias por tu renta "+this.user.firstname+"!</h3><br>Tu coche es <p>"+this.vehicleName+" "+this.vehicleType+"</p><br><b>"+this.rent.dateofpickup+" al "+this.rent.returnday+"</b><br><b>Total: $"+this.totalPrice+" MXN</b><br>"+"<br>para mas información click <a href='https://raebe.azurewebsites.net/profile/rents'>aquí</a>","Notificación de renta RaeBe").subscribe(
      //       data=>{
      //         this.spinner.hide();
      //           this.router.navigate(['/profile/rents']);

      //       }
      //     );
         
      //    }
      //  );
     

  }
  public initConfig(): void {
    this.payPalConfig = new PayPalConfig(PayPalIntegrationType.ClientSideREST, PayPalEnvironment.Sandbox, {
      commit: true,
      client: {
        sandbox:'Aa0FvvYFkgwXv1YB7e2ZqZ3phmubW5ygs6DgY9mltRMde6uVUzksGm1TNyk1QXaZ5UU25VpyfCD6LiMx'
      },
      button: {
        label: 'paypal',
      },
      onPaymentComplete: (data, actions) => {
        console.log('OnPaymentComplete');
        this.onRent();


      },
      onCancel: (data, actions) => {
        console.log('OnCancel');
      },
      onError: (err) => {
        console.log('OnError');
      },
      transactions: [{
        amount: {
          currency: 'MXN',
          total: this.totalPrice
        }
      }]
    });
  }
}


