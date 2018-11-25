import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class RentersService extends ConfigService {
  public httpOptions: any;
  public server: string;
  public authToken: any;

  constructor(public http: HttpClient,
    public router: Router) {
    super();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.server = super.getServer();

  }
  public getRentByID(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetRentByID/?id_clientsrenter=" + id, this.httpOptions)
  }
  public GetRentByIdClients(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetRentByIdClients/?id_clients=" + id, this.httpOptions)
  }

  public PostRent(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostRent/", JSON.stringify(json), this.httpOptions);

  }

  public postMail(email,body,title) {
   let  json = {
      email: email,
		  body : body,
		  title : title
    }
    
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostMail/", JSON.stringify(json), this.httpOptions);

  }
  public getRatetByIdClients(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetRateByIdClients/?id_clients=" + id, this.httpOptions)
  }

  public postRate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostRate/", JSON.stringify(json), this.httpOptions);

  }
  public putRentForUpdate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("https://" + this.server + "/api/PutRentForUpdate/", JSON.stringify(json), this.httpOptions);
  }

  public getRentPreferencesByClient(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetRentPreferencesByClient/?id_clients=" + id, this.httpOptions)
  }

  public PostRentPreferences(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostRentPreferences/", JSON.stringify(json), this.httpOptions);

  }

  public putRentPreferencesForUpdate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("https://" + this.server + "/api/PutRentPreferencesForUpdate/", JSON.stringify(json), this.httpOptions);
  }

}