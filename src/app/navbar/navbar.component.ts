import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarsService } from '../services/cars-service/cars.service';
import { SearchResultComponent } from '../search-result/search-result.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  extends SearchResultComponent implements OnInit {
  @Input()
    isLogged = false;
  public user: any;
  public userIsRenter : boolean;
  itemState = [
    'Marca','Modelo','Año'
  ];
  searchItem:any
  constructor(public spinner: NgxSpinnerService,public router: Router,public clientsService : ClientsService, public carsService: CarsService) {
    super(router, spinner,clientsService,carsService);
   }


  @ViewChild('unloggedButtons') unloggedButtons: ElementRef;
  @ViewChild('loggedButtons') loggedButtons: ElementRef;

  ngOnInit() {
    
    if(this.clientsService.getToken())
        this.isLogged=true;
    if (this.isLogged) {
      this.unloggedButtons.nativeElement.remove();
      this.user = JSON.parse(this.clientsService.getUserInfo());
      if(this.user.isrenter == 1)
        this.userIsRenter = true;

    } else {
      this.loggedButtons.nativeElement.remove();
    }

  }
  onChange(value: any){
   
    sessionStorage.setItem("searchSelected",value);
  }
  onSearchItem()
  {
    console.log(this.searchItem)
    sessionStorage.setItem("searchItem",this.searchItem)

  }
  onRentPerfil(){
    
    localStorage.setItem("clientSelected",this.user.id_clients,);
    
    this.router.navigate(['/client/vehicle-info-user']);
  }
  onSearch()
  {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){return false;};

    let currentUrl = this.router.url + '?';
  
    this.router.navigateByUrl(currentUrl)
      .then(() => {
        this.router.navigated = false;
        this.router.navigate(['/search-result']);
      })
  }
  onRenter(){
    this.router.navigate(['renter']);
  }
  onProfile(){
    this.router.navigate(['profile']);
  }
  
}
