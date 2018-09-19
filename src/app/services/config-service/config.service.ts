import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private Server = "localhost:8000";
 
  constructor() { }
  
  
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
