import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyVehicleComponent } from '../my-vehicle/my-vehicle.component';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';

@Component({
  selector: 'app-my-vehicle-images',
  templateUrl: './my-vehicle-images.component.html',
  styleUrls: ['./my-vehicle-images.component.css'],
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
export class MyVehicleImagesComponent extends MyVehicleComponent implements OnInit  {
  
  carImage: any
  url:any
  token:any
  fileToUpload: File = null;
  
  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }

  ngOnInit() {
    super.ngOnInit()
    this.token = "{Authorization', 'bearer'"+this.clientService.getToken()+" 'Content-Type': 'form-data'}";
  }
 
  handleFileInput(files: FileList) {
    for (var i  = 0 ; i < files.length; i ++ ) {
      this.fileToUpload = files.item(i);
      const formData: FormData = new FormData();
      this.carsService.postCarImages(this.fileToUpload,this.user.id_clients).subscribe(
        data => {
          alert("Imagen Guardada")
        // do something, if upload success
        }, error => {
          console.log(error);
        });
    }
   
  }

  public onSaveCarImages() {
    alert("Imagenes guardadas")
  }
}