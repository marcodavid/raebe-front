import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';

@Component({
  selector: 'app-my-vehicle-insurance',
  templateUrl: './my-vehicle-insurance.component.html',
  styleUrls: ['./my-vehicle-insurance.component.css'],
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
export class MyVehicleInsuranceComponent extends MyVehicleComponent implements OnInit  {

  
  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }

  ngOnInit() {
    super.ngOnInit();
    

  }
  addCoverture() {
    this.userCoverages.push(this.coverage) 
    this.coverage = {
      id_policy:"",
      description:"",
      assurancesum:"",
      deductibles:""
    };  
  }

  removeCoverture(index) { 
    this.userCoverages.splice(index, 1); 
   
  }

  public onSavePolicy()  {
    if(this.userCarHasPolicy) {
        this.carsService.putPolicyForUpdate(this.userPolicy).subscribe(
          data => {
            alert("guardado, poliza actualizada")
            this.onSaveCoverages();
          },
          error => {
            alert("nel")
          }
        );
    } else {
      this.userPolicy.id_car = this.userCar.id_car;
      this.carsService.postPolicy(this.userPolicy).subscribe(
        data => {
          alert("guardado, poliza creada")
          this.onSaveCoverages();
        },
        error => {
          alert("nel")
        }
      );
    }
  }

  public onSaveCoverages() {
    if(this.userCarHasCoverages) {
       for(let item in this.userCoverages) {
        this.userCoverages[item].id_policy = this.userPolicy.id_policy;
      }  
      this.carsService.deleteCoverage(this.userCoverages[0].id_policy).subscribe();       
      this.carsService.postCoverage(this.userCoverages).subscribe(
        data => {
          alert("guardado, coverage actualizado")
        },
        error => {
          alert("nel")
        }
      );
    } else {
      for(let item in this.userCoverages) {
        this.userCoverages[item].id_policy = this.userPolicy.id_policy;
      }  
      this.carsService.postCoverage(this.userCoverages).subscribe(
        data => {
          alert("guardado, coverage creado")
        },
        error => {
          alert("nel")
        }
      );
    }
}

}
