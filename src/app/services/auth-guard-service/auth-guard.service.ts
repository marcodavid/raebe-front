import { Injectable } from '@angular/core';
import { ConfigService } from '../config-service/config.service';
import {Router} from '@angular/router';
@Injectable()
export class AuthGuardService extends ConfigService {
  
  constructor(private router:Router ) {super();};
  private authToken = super.getToken();
  canActivate() {
    if(typeof this.authToken!='undefined' && this.authToken)
      return true;
    else
    { 
      this.router.navigate(['']);
      return false;
    }
      
 
  } 
}
