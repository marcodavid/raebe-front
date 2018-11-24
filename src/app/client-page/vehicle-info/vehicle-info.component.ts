import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Evaluation } from './evaluation';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { CarsService } from '../../services/cars-service/cars.service';
import * as $ from 'jquery';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Session } from 'protractor';
import { RentersService } from '../../services/renters-service/renters.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css'],
  animations: [
    trigger('animacionAparecer', [
      state('void', style({
        transform: 'translateX(-20%)',
        opacity: .8
      })),
      transition(':enter', [
        animate(200, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class VehicleInfoComponent implements OnInit {
  protected images = new Array();
  protected comment: any;
  protected rating: any;
  protected vehicleName: string;
  protected vehicleType: string;
  protected features: string[];
  protected description: string;
  protected client: any;
  protected rates: any;
  protected clientSelected: any
  protected clientSelectedCar: any
  protected evaluations: Evaluation[] = [];
  protected hoveredDate: NgbDate;
  protected perfilPhoto: any;
  protected showButton = false;
  protected totalDays: any
  protected totalPrice: any
  protected fromDate: NgbDate;
  protected toDate: NgbDate;
  protected today = new Date();
  protected dd = this.today.getDate();
  protected mm = this.today.getMonth() + 1;
  protected yyyy = this.today.getFullYear();
  protected minday: NgbDate = new NgbDate(this.yyyy, this.mm, this.dd);
  protected user: any;
  locatioResult: any;
  location = {
    id_clients: "",
    lat: 20.676667,
    lng: -103.3475
  }
  isOwner: boolean;
  ratesArray = new Array();
  clientSearch: any;


  constructor(protected spinner: NgxSpinnerService, protected clientService: ClientsService, protected carsService: CarsService, calendar: NgbCalendar, protected renterService: RentersService) {
   
    this.vehicleName = "Dodge Attitude";
    this.vehicleType = "Automovil";
    this.features = [];
    this.evaluations.push({
      username: "Samuel",
      value: 9.6,
      date: "7 Junio 2018",
      comment: "Mucho mejor de lo que esperaba"
    });
    this.evaluations.push({
      username: "Samuel",
      value: 9.6,
      date: "7 Junio 2018",
      comment: "Mucho mejor de lo que esperaba"
    });


    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);

  }

  ngOnInit() {
    this.spinner.show();
    this.clientSelected = localStorage.getItem("clientSelected");
    this.totalDays = this.TotalDays(this.toDate, this.fromDate);
    this.user = JSON.parse(this.clientService.getUserInfo());
    if (this.clientSelected == this.user.id_clients)
      this.isOwner = true;
    else this.isOwner = false;
    this.loadDescription(this.clientSelected);

    this.location.id_clients = this.clientSelected;

    if (this.user)
      this.showButton = true;

    else this.showButton = false;

    this.clientService.getClientsByID(this.clientSelected).subscribe(
      data => { this.client = data }
    )

    this.renterService.getRatetByIdClients(this.clientSelected).subscribe(
      data => {
        this.rates = data;
        for (let rate in this.rates) {
          this.clientService.getClientsByID(this.rates[rate].id_clientscommenter).subscribe(
            data => {
               this.clientSearch = data;
              this.carsService.getCarImagesByID(this.rates[rate].id_clientscommenter).subscribe(
                data => {
                  for (let img in data) {
                    if (data[img].type == 2) {
                      this.ratesArray[rate] = {
                        name: this.clientSearch.firstname,
                        file: '//' + this.clientService.getServer() + data[img].file,
                        comment: this.rates[rate].comment,
                        rate:this.rates[rate].rate
                      }
                      break;
                    }
                  }
                }
              )
            }
          )
        }
      }
    )

    this.clientService.getLocationByID(this.clientSelected).subscribe(
      data => {
        this.locatioResult = data;
        this.location.lat = Number(this.locatioResult.lat);
        this.location.lng = Number(this.locatioResult.lng);
      },
      error => {
        this.clientService.postLocation(this.location).subscribe(
          data => {

          },
        )
      }

    )
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.totalDays = this.TotalDays(this.toDate, this.fromDate);
    localStorage.setItem("fromDate", JSON.stringify(this.fromDate));
    localStorage.setItem("toDate", JSON.stringify(this.toDate));
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  public TotalDays(toDate, fromDate) {
    let day1 = new Date(toDate.year, toDate.month, toDate.day);
    let day2 = new Date(fromDate.year, fromDate.month, fromDate.day);
    let difference = day1.getTime() - day2.getTime();
    let totalDay = difference / 1000 / 60 / 60 / 24;
    return totalDay;

  }
  public loadDescription(clientSelected) {

    this.carsService.getCarByID(clientSelected).subscribe(
      data => {
        this.clientSelectedCar = data
        localStorage.setItem("price", this.clientSelectedCar.price)
        this.vehicleName = this.clientSelectedCar.model;
        this.vehicleType = this.clientSelectedCar.brand;

        if (this.clientSelectedCar["automatic"] == 1)
          this.clientSelectedCar["automatic"] = "automática";
        else
          this.clientSelectedCar["automatic"] = "manual";

        for (var item in this.clientSelectedCar) {
          if (item == "id_car" || item == "brand" || item == "model" || item == "description" || item == "automatic" || item == "year" || item == "passagers" || item == "doors" || item == "agerestriction" || item == "price")
            continue;
          else {
            if (this.clientSelectedCar[item] == 1)
              this.clientSelectedCar[item] = " Sí";
            else
              this.clientSelectedCar[item] = "No";
          }
        }
        this.carsService.getCarImagesByID(clientSelected).subscribe(
          data => {
            let index = 0;
            for (let img in data) {
              if (data[img].type != 2) {
                this.images[index] = '//' + this.clientService.getServer() + data[img].file;
                index++;
              }
              else
                this.perfilPhoto = '//' + this.clientService.getServer() + data[img].file
              if (index < 5) {
                for (let i = index; i < 6; i++) {
                  if (data[img].type != 2)
                    this.images[i] = '//' + this.clientService.getServer() + data[img].file;
                }

              }
            }
            this.spinner.hide();
          });

        this.features.push(
          "Edad de preferente  para el conductor:   " + this.clientSelectedCar["agerestriction"] + " años",
          "Tranmisión   " + this.clientSelectedCar["automatic"],
          "Año:  " + this.clientSelectedCar["year"],
          "Pasajeros:  " + this.clientSelectedCar["passagers"],
          "Puertas:  " + this.clientSelectedCar["doors"],
          "Aire acondicionado:  " + this.clientSelectedCar["ac"],
          "Audio auxiliar:  " + this.clientSelectedCar["audioaux"],
          "Turbo:  " + this.clientSelectedCar["turbo"],
          "Bolsas de aire:  " + this.clientSelectedCar["airbags"],
          "Asiento de bebé: " + this.clientSelectedCar["babysit"],
          "Asiento de infante:  " + this.clientSelectedCar["childsit"],
          "GPS: " + this.clientSelectedCar["gps"],
          "Restriccion de fumar:  " + this.clientSelectedCar["smokerestriction"],
          "Espacio para maletas:  " + this.clientSelectedCar["numsuitcase"],
          "Alarma:  " + this.clientSelectedCar["alarm"],
          "Sensor de proximidad:  " + this.clientSelectedCar["sensor"],
          "Capota:  " + this.clientSelectedCar["sparetier"],
        )
        this.description = this.clientSelectedCar["description"]

      });
  }
  onChoseLocation(event) {

    this.location.lat = event.coords.lat;
    this.location.lng = event.coords.lng;
    this.clientService.putLocationForUpdate(this.location).subscribe();
  }
}

