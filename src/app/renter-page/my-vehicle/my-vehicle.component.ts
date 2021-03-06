import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CarsService } from '../../services/cars-service/cars.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import { MyVehicleCalendarComponent } from '../my-vehicle-calendar/my-vehicle-calendar.component';

@Component({
  selector: 'app-my-vehicle',
  templateUrl: './my-vehicle.component.html',
  styleUrls: ['./my-vehicle.component.css'],
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
export class MyVehicleComponent implements OnInit {
  constructor(public clientService: ClientsService, public carsService: CarsService) { }
  public userHasCar: boolean;
  public userCarHasPolicy: boolean;
  public userCarHasCoverages: boolean;
  public userCarHasRentPreferences: boolean;
  public userCarHasPrice: boolean;
  public user: any;
  public token: any;
  public userCar: any;
  public userPolicy: any;
  public userCoverages: any;
  public coverage: any = {
    id_policy: '',
    description: '',
    assurancesum: '',
    deductibles: ''
  };
  public myVehicleCalendarComponent: MyVehicleCalendarComponent;
  ngOnInit() {
    this.token = this.clientService.getToken();
    this.user = JSON.parse(this.clientService.getUserInfo());

     this.carsService.getCarByID(this.user.id_clients).subscribe(
      data => {
        this.userCar = data;
        this.userHasCar = true;
        if (this.userCar['automatic'] == 1) {
           this.userCar['automatic'] = 'Automática';
        } else {
           this.userCar['automatic'] = 'Manual';
        }
       
        for(let item in  this.userCar) {
          if(item == "id_car" || item== "brand" || item== "model"  || item== "description" || item== "automatic"||item == "year"|| item == "passagers"||item == "doors"||item == "agerestriction"||item=="price") 
            continue;
          else {
            if( this.userCar[item] == 1)
               this.userCar[item] = "Si" ;
            else
               this.userCar[item]= "No";
          }     
        }
        this.loadPolicy();
         
      },
      error => {
        this.userHasCar = false;
        this.userCar = {
          id_car: '',
          id_clients: this.user.id_clients,
          brand: '',
          model:'',
          year: '',
          description: '',
          specialservices: '',
          automatic: '',
          type: '',
          ac: '',
          doors: '',
          turbo: '',
          passagers: '',
          numsuitcase:'',
          kmxl: '',
          airbags:'',
          abs: '',
          costxday: '',
          averagecost: '',
          babysit: '',
          childsit: '',
          gps: '',
          agerestriction: '0',
          latepolicy: '',
          rentalrestrictions: '',
          smokerestriction: '',
          audiobluetooth: '',
          audioaux: '',
          customaudio: '',
          number_4x4: '',
          sparetier: '',
          alarm: '',
          sensor: '',
          travelout:'',
          price:'0'
        }
      }
    );

  }

  public loadPolicy() {
    this.carsService.getPolicyByID(this.userCar.id_car).subscribe(
      data =>{
        this.userCarHasPolicy = true;
        this.userPolicy = data;
        this.loadCoverages();
      },
      error =>{
        this.userCarHasPolicy = false;
        this.userPolicy = {
          id_car:'',
          clientpolicynumber:'',
          policy:'',
          company:'',
          cis:'',
          clientpolicyname:'',
          validationdatestart:'',
          validationdateend:''
        }
        this.loadCoverages();
      }

    );
  }

  public loadCoverages() {
    this.carsService.getCoverageByID(this.userPolicy.id_policy).subscribe(
      data => {
       
         this.userCoverages = data
         this.userCarHasCoverages = true;
        this.checkIfUserCouldBeRenter()
      },
      error => {
        this.userCarHasCoverages = false;
         this.userCoverages = [{
          id_policy:'',
          description:'',
          assurancesum:'',
          deductibles:''
        }]; 
      }
    );
  }
 
public checkIfUserCouldBeRenter() {
  if(this.user.isrenter==0) {
    if(this.userCarHasCoverages && this.userCarHasPolicy && this.userCar.price > 0  && this.userHasCar ) {
      this.user.isrenter = 1;
      this.clientService.putClientForUpdate(this.user);
    }
  }
}

}
