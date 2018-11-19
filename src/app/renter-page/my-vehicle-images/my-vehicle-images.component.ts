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
  cont = 0
  user : any
  url:any
  token:any
  fileToUpload: File = null;
  protected carImage  = new Array();
  protected carImageConteiner  = new Array();
  
  constructor( clientsService: ClientsService, carsService: CarsService) {
    
    super(clientsService,carsService);
    
  }

  ngOnInit() {
   
    this.user = JSON.parse(this.clientService.getUserInfo());
    this.token = "{Authorization', 'bearer'"+this.clientService.getToken()+" 'Content-Type': 'form-data'}";
    this.carsService.getCarImagesByID(this.user.id_clients).subscribe(
      data => {
        for( let item in data) {
            if(data[item].type == 1) {
              this.carImage.push('//' + this.clientService.getServer() + data[item].file);
              this.carImageConteiner.push(data[item]);
              this.cont++;
            }
              
        }
      });
  }
 
  handleFileInput(files: FileList) {
    for (var i  = 0 ; i < files.length; i ++ ) {
      this.fileToUpload = files.item(i);
      this.carsService.postCarImages(this.fileToUpload,this.user.id_clients,1).subscribe(
        data => {
          window.location.reload()
          
        }, error => {
          console.log(error);
        });
    }
   
  }
  public onDeleteImage(index) {
    this.carsService.deleteImage(this.user.id_clients,1,this.carImageConteiner[index].id).subscribe(
      data=>{
        window.location.reload()
          
      }
    );
  }
  public onSaveCarImages() {
  }
}