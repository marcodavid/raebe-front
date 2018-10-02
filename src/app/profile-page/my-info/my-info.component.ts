import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
  animations: [
    trigger('animacionAparecer', [
      state('void', style({
        transform: 'translateY(-10%)',
        opacity: .5
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
export class MyInfoComponent implements OnInit {


  constructor(private clientService: ClientsService) { }
  private user: any
  private userAddress: any
  private userDriverLicense: any
  private token: any
  private showDatePicker = false;
  client = {
    firstname: "",
    lastname: "",
    email: "",
    isrenter: 0,
    age: '',//toDo change this column in db
    curp: "",
    telnumber: "",
    lada: "",
    telcountry: "",
    id_address: 0,
    imgprofilephoto: "",
    fulldata: 0
  }

  address = {
    id_address: 0,
    zipcode: "",
    country: "",
    state: "",
    province: "",
    numint: "",
    numext: "",
    city: "",
    street: ""
  }

  driverlicense = {
    id_driverlicense: 0,
    id_clients: 0,
    licensenum: "",
    startday: "",
    endday: ""
  }
  ngOnInit() {
    this.token = this.clientService.getToken();
    this.user = JSON.parse(this.clientService.getUserInfo());
    this.userAddress = this.clientService.getAddressByClient(this.user.id_clients)
      .subscribe(
        data => {
          if (data)
            this.userAddress = data;
        }
      );
    this.userDriverLicense = this.clientService.getDriverLicenseByClient(this.user.id_clients)
      .subscribe(
        data => {
          if (data)
            this.userDriverLicense = data;
        }
      );


  }

  public saveInfo() {
    this.validateChangesOnUserInfo()
    this.validateChangesOnUserAddress()
    this.validateChangesOnUserDriverLicense();
    this.user.fulldata = this.checkFullData();
    this.clientService.putClientForUpdate(this.user);
    this.clientService.putAddressForUpdate(this.userAddress);
    this.clientService.putDriverLicenseForUpdate(this.userDriverLicense)

    

  }

  public checkFullData() {
    let isFullData = 1;

    for (var item in this.user) {
      if (this.user[item] || item == "isrenter" || item == "fulldata" || item == "imgprofilephoto" || item == "id_address")
        continue;
      else isFullData = 0;
    }

    for (var item in this.userAddress) {
      if (this.userAddress[item]|| item == "state" || item == "street")
        continue;
      else isFullData = 0;
    }

    for (var item in this.userDriverLicense) {
      if (this.userDriverLicense[item])
        continue;
      else isFullData = 0;
    }
    return isFullData;

  }
  public validateChangesOnUserInfo() {

    if (this.client.firstname != "")
      this.user.firstname = this.client.firstname;



    if (this.client.lastname != "") {
      this.user.lastname = this.client.lastname;

    }

    if (this.client.email != "") {
      this.user.email = this.client.email;

    }

    if (this.client.curp != "") {
      this.user.curp = this.client.curp;

    }

    if (this.client.telcountry != "") {
      this.user.telcountry = this.client.telcountry;

    }
    if (this.client.telnumber != "") {
      this.user.telnumber = this.client.telnumber;

    }
    if (this.client.lada != "") {
      this.user.lada = this.client.lada;

    }
  }

  public validateChangesOnUserAddress() {

    if (this.address.zipcode != "")
      this.userAddress.zipcode = this.address.zipcode;

    if (this.address.country != "")
      this.userAddress.country = this.address.country;

    if (this.address.state != "")
      this.userAddress.state = this.address.state;

    if (this.address.city != "")
      this.userAddress.city = this.address.city;

    if (this.address.province != "")
      this.userAddress.province = this.address.province;

    if (this.address.street != "")
      this.userAddress.province = this.address.street;

    if (this.address.numint != "")
      this.userAddress.numint = this.address.numint;

    if (this.address.numext != "")
      this.userAddress.numext = this.address.numext;

  }

  public validateChangesOnUserDriverLicense() {
    if (this.driverlicense.licensenum != "")
      this.userDriverLicense.licensenum = this.driverlicense.licensenum;
  }

  public changeDatePicker() {
    this.showDatePicker = true;
  }
  public logOut() {
    localStorage.clear();
    location.reload();
  }
}
