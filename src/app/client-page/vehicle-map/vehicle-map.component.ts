import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.css']
})
export class VehicleMapComponent implements OnInit {
  geolocationPosition: Position;
  markerLatitude: any;
  markerLongitude: any;
  constructor() { }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
          position => {
              this.geolocationPosition = position,
              this.markerLatitude = position.coords.latitude,
              this.markerLongitude = position.coords.longitude,
              console.log(this.geolocationPosition);
          },
          error => {
              switch (error.code) {
                  case 1:
                      console.log('Permission Denied');
                      break;
                  case 2:
                      console.log('Position Unavailable');
                      break;
                  case 3:
                      console.log('Timeout');
                      break;
              }
          }
      );
    }
  }
}
