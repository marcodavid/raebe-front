import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import {Router} from '@angular/router';

import * as $ from 'jquery';
@Injectable()
export class ClientsService extends ConfigService{
  private httpOptions: any;
  private server: string;
  private authToken: any;
  
  constructor(private http: HttpClient,
    private router:Router) {
    super();
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.server = super.getServer();

  }
  public getClients() {
    $.get("http://"+this.server+"/api/GetClients/");
    
  }

  public postClientToSign(json) {
      return this.http.post("http://"+this.server+"/api/PostClientToSign/", JSON.stringify(json), this.httpOptions);  
  }
    public postClientToLogin(json) {
       return this.http.post("http://"+this.server+"/api/PostClientToLogin/", JSON.stringify(json), this.httpOptions);
    
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
