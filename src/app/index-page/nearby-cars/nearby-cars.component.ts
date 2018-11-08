import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CarsService } from '../../services/cars-service/cars.service';
import { ClientsService } from '../../services/clients-service/clients.service';

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
  randomCarsArray: any = [];
  randomUserCar: any;
  brandmark: any = [];
  model: any = [];
  description: any = [];
  file: any = [];
  img: any = [];

  constructor(private clientService: ClientsService, private carsService: CarsService) { }
  protected arrayCarsSaved: any = []
  ngOnInit() {

    this.clientService.getRandomClients().subscribe(
      data => {
        this.randomCarsArray = data
        this.loadNearbyCars(0);
        this.loadNearbyCars(1);
        this.loadNearbyCars(2);

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
    localStorage.setItem('clientSelected',this.randomCarsArray[selected].id_clients );
  }
  public loadNearbyCars(car) {
    this.carsService.getCarByID(this.randomCarsArray[car].id_clients).subscribe(
      data => {
        this.randomUserCar = data;
        this.brandmark[car] = this.randomUserCar.brand;
        this.model[car] = this.randomUserCar.model;
        this.description[car] = this.randomUserCar.description;
        this.file[car] = this.carsService.getCarImagesByID(this.randomCarsArray[car].id_clients).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.img[car] = '//' + this.clientService.getServer() + data[0].file;

          }
        );
      });
  }

}
