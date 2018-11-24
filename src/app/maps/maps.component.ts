import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients-service/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: 20.676667;
  lng: -103.3475;
  locations:any = new Array();
  constructor(public clientsService:ClientsService,public router: Router) { }

  ngOnInit() {
    this.clientsService.getLocations().subscribe(
      data=>{
        this.locations =  data;

      }
    );
  }
  onClickMap(location){
    localStorage.setItem("clientSelected",location.id_clients,);
    this.router.navigate(['/client/vehicle-info']);


  }

}
