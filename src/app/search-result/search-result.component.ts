import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientsService } from '../services/clients-service/clients.service';
import { CarsService } from '../services/cars-service/cars.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  @Input()
  horizontal: boolean;
  @ViewChild('verticalCard') verticalCard: ElementRef;
  @ViewChild('horizontalCard') horizontalCard: ElementRef;
  CarsArray: any = [];
  dataInfo = new Array();
  fileInfo= new Array();
  randomUserCar = [
    {data: {},
    file: ""} ];
   
  brandmark: any = [];
  model: any = [];
  description: any = [];
  file: any = [];
  img: any = [];
  moreCars = 3;
  carsCont = new Array();
  isMoreCars: boolean = true;
  filterBy: any;
  searchItem: string;
  // userFilter: any ;
  filter = {
    language: {
      $or: ['Italian', 'English']
    }
  };
  userFilter: any ;
  itemState = [
    'Marca','Modelo','Año','Precio'
  ];
  constructor(private spinner: NgxSpinnerService, private clientService: ClientsService, private carsService: CarsService) { }
  protected arrayCarsSaved: any = []
  ngOnInit() {
    this.spinner.show();
    this.clientService.getClients().subscribe(
      data => {
        this.CarsArray = data
        this.loadNearbyCars();


      },
      error => { }
    );

    this.filterBy = sessionStorage.getItem("searchSelected");
    this.searchItem = sessionStorage.getItem("searchItem")
  
    switch( this.filterBy) {
      case 'Marca':
      this.userFilter =  { data: {brand: this.searchItem} };
      break;
      case 'Modelo':
      this.userFilter =  { data: {model: this.searchItem} };
      break;
      case 'Año':
      this.userFilter =  { data: {year: this.searchItem} };
      break;

    }
  
  }
  onChange(value: any){
   
    sessionStorage.setItem("searchSelected",value);
  }
  onSearch()
  {
    sessionStorage.setItem("searchItem",this.searchItem)
  }
  onSearchClicked() {
    this.filterBy = sessionStorage.getItem("searchSelected");
    this.searchItem = sessionStorage.getItem("searchItem")
  
    switch( this.filterBy) {
      case 'Marca':
      this.userFilter =  { data: {brand: this.searchItem} };
      break;
      case 'Modelo':
      this.userFilter =  { data: {model: this.searchItem} };
      break;
      case 'Año':
      this.userFilter =  { data: {year: this.searchItem} };
      break;

  }
}
  saveCarInfo(selected) {
    localStorage.setItem('clientSelected', this.CarsArray[selected].id_clients);
  }
  public loadNearbyCars() {
    for (let car in this.CarsArray) {
      this.carsService.getCarByID(this.CarsArray[car].id_clients).subscribe(
        data => {
          this.dataInfo[car] = data;
          this.carsService.getCarImagesByID(this.CarsArray[car].id_clients).subscribe(
            data => {
              for (let img in data) {
                if (data[img].type != 2) {
                  this.fileInfo[car] = '//' + this.clientService.getServer() + data[img].file
                  break;
                }
              }
              
               
                this.carsCont[car] = {
                  data: this.dataInfo[car],
                file:this.fileInfo[car]
             
              }
              this.spinner.hide();
            }
            
          );

        });
     
    }
   
  }


}
