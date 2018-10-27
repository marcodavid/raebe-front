import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
@Injectable()
export class ClientsService extends ConfigService {
  private httpOptions: any;
  private server: string;
  private authToken: any;

  constructor(private http: HttpClient,
    private router: Router) {
    super();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.server = super.getServer();

  }
  public getRandomClients() {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetRandomClients/", this.httpOptions)


  }

  public getAddressByClient(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetAddressByClient/?id_clients=" + id, this.httpOptions)

  }

  public getDriverLicenseByClient(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetDriverLicenseByClient/?id_clients=" + id, this.httpOptions)
  }
  public postClientToSign(json) {
    return this.http.post("http://" + this.server + "/api/PostClientToSign/", JSON.stringify(json), this.httpOptions);
  }

  public postClientToLogin(json) {
    return this.http.post("http://" + this.server + "/api/PostClientToLogin/", JSON.stringify(json), this.httpOptions);

  }
  public postAddress(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostAddress/", JSON.stringify(json), this.httpOptions);
  }
  public postDriverLicense(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostDriverLicense/", JSON.stringify(json), this.httpOptions);
  }

  public putClientForUpdate(userInfoUpdated) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    this.http.put("http://" + this.server + "/api/PutClientForUpdate/", JSON.stringify(userInfoUpdated), this.httpOptions)
      .subscribe(
        data => {
          if(data && userInfoUpdated.isrenter == 0) 
            alert(" ya se guardo el cliente  cambia este aviso despues por uno mas bonito");
          if(data && userInfoUpdated.isrenter == 1)
            alert(" Felidcidades ya eres un usuario Raebe arrendador!");  

        }
      );
    this.setUserInfo(userInfoUpdated);
  }
  public putAddressForUpdate(userInfoUpdated) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    this.http.put("http://" + this.server + "/api/PutAddressForUpdate/", JSON.stringify(userInfoUpdated), this.httpOptions)
      .subscribe(
        data => {
          if (data) {
            alert(" ya se guardo la direccion este aviso despues por uno mas bonito")

          }

        }
      );
  }

  public putDriverLicenseForUpdate(userInfoUpdated) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    this.http.put("http://" + this.server + "/api/PutDriverLicenseForUpdate/", JSON.stringify(userInfoUpdated), this.httpOptions)
      .subscribe(
        data => {
          if (data) {
            alert(" ya se guardo la licencia este aviso despues por uno mas bonito")

          }

        }
      );
  }
  public getAuthToken() {
    return this.authToken;
  }

  public setToken(token) {
    super.setToken(token);

  }
  public getToken() {
    return super.getToken();

  }
  public setUserInfo(userInfo) {
    super.setUserInfo(userInfo);
  }

  public getUserInfo() {
    return super.getUserInfo();
  }
}
