import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';
import { RentersService } from '../../services/renters-service/renters.service';

@Component({
  selector: 'app-my-vehicle-calendar',
  templateUrl: './my-vehicle-calendar.component.html',
  styleUrls: ['./my-vehicle-calendar.component.css'],
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
export class MyVehicleCalendarComponent  extends MyVehicleComponent implements OnInit  {
  
  
  constructor( clientsService: ClientsService, carsService: CarsService,protected renterService:  RentersService) {
    
    super(clientsService,carsService);
    
  }
  protected userRentPreferences : any;
  ngOnInit() {
    super.ngOnInit();
    this.loadCalendar();
   
  }
  public loadCalendar() {
    this.renterService.getRentPreferencesByClient(this.user.id_clients).subscribe(
      data =>{
        this.userCarHasRentPreferences = true;
        this.userRentPreferences = data;
        this.checkIfUserCouldBeRenter();
      },
      error =>{
        this.userCarHasRentPreferences = false;
        this.userRentPreferences = {
          id_clients:'',
          firsthour:'',
          lasthour:'',
          daysbeforerent:'',
          mintime:'',
      
        }
      }
    )
  }
  public onSaveCalendar(){

    if(this.userCarHasRentPreferences) {
      this.userCarHasRentPreferences = true;
      this.renterService.putRentPreferencesForUpdate(this.userRentPreferences).subscribe(
        data =>{
         
         alert("preferencias actualizadas")
        },
        error =>{
          alert("nel")
        }
      )
    } else {
      this.userRentPreferences.id_clients = this.user.id_clients;
      this.renterService.PostRentPreferences(this.userRentPreferences).subscribe(
        data =>{
         
         alert("preferencias creadas")
        },
        error =>{
          alert("nel")
        }
      )
    }
  }
}
