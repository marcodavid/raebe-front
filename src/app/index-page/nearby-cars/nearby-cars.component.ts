import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CarsService } from '../../services/cars-service/cars.service';
import { ClientsService } from '../../services/clients-service/clients.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nearby-cars',
  templateUrl: './nearby-cars.component.html',
  styleUrls: ['./nearby-cars.component.css']
})
export class NearbyCarsComponent implements OnInit {
  @Input()
  horizontal: boolean;
  @ViewChild('verticalCard') verticalCard: ElementRef;
  @ViewChild('horizontalCard') horizontalCard: ElementRef;
  CarsArray: any = [];
  randomUserCar: any;
  brandmark: any = [];
  price: any = [];
  model: any = [];
  description: any = [];
  file: any = [];
  img: any = [];
  moreCars = 3;
  carsCont = new Array();
  isMoreCars: boolean = true;

  constructor(public router: Router,public spinner: NgxSpinnerService, public clientService: ClientsService, public carsService: CarsService) { this.spinner.show(); }
  public arrayCarsSaved: any = []
  ngOnInit() {

    this.clientService.getClients().subscribe(
      data => {
        this.CarsArray = data
        this.loadNearbyCars(this.moreCars);


      },
      error => { }
    );
    if (this.horizontal) {
      this.verticalCard.nativeElement.remove();
    } else {
      this.horizontalCard.nativeElement.remove();
    }
  }

  saveCarInfo(selected) {
    localStorage.setItem('clientSelected', this.CarsArray[selected].id_clients);
    this.router.navigate(['/client/vehicle-info']);
  }
  public loadNearbyCars(limit) {
    this.carsCont = [];
    this.spinner.show();
    for (let car = 0; car < limit; car++) {
      this.carsCont.push("");
      this.carsService.getCarByID(this.CarsArray[car].id_clients).subscribe(
        data => {

          this.randomUserCar = data;
          this.brandmark[car] = this.randomUserCar.brand;
          this.model[car] = this.randomUserCar.model;
          this.description[car] = this.randomUserCar.description;
          this.price[car] = this.randomUserCar.price;
          this.file[car] = this.carsService.getCarImagesByID(this.CarsArray[car].id_clients).subscribe(
            data => {
              for (let img in data) {
                if (data[img].type != 2)
                  this.img[car] = '//' + this.clientService.getServer() + data[img].file
              }

              this.spinner.hide();
            }
          );
          this.spinner.hide();
        });
    }

  }

  public showMoreCars() {

    this.moreCars += 1;
    if(this.CarsArray.length>=this.moreCars)
    this.loadNearbyCars(this.moreCars);


  }
}
