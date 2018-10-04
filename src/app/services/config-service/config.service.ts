import { Injectable } from '@angular/core';
import { LoaderService } from '../loader-service/loader.service';

@Injectable()
export class ConfigService extends LoaderService{
  private Server = "localhost:8000";
 
  constructor() { super() }
  
  
  getUserInfo() : any{
    return localStorage.getItem('authUserInfo');

   }
 
   setUserInfo(authUserInfo) {
    localStorage.setItem('authUserInfo', JSON.stringify(authUserInfo));


   }

  getServer(): any {
   return  this.Server;
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  getToken() : any {
    return localStorage.getItem('token');
  }
}
