import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class RentersService extends ConfigService {
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
  public getRentByClient(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetRentByClient/?id_clients=" + id, this.httpOptions)
  }

  public PostRent(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostRent/", JSON.stringify(json), this.httpOptions);

  }
  public getRentPreferencesByClient(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetRentPreferencesByClient/?id_clients=" + id, this.httpOptions)
  }

  public PostRentPreferences(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostRentPreferences/", JSON.stringify(json), this.httpOptions);

  }

  public putRentPreferencesForUpdate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("http://" + this.server + "/api/PutRentPreferencesForUpdate/", JSON.stringify(json), this.httpOptions);
  }

}