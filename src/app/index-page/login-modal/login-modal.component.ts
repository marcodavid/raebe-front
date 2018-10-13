import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients-service/clients.service';
import { Router } from '@angular/router';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import * as $ from 'jquery';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {
  private showAlert = false;
  constructor(private clientsService: ClientsService, private router: Router) { }
  json = {
    email: "",
    password: "",
  }
  ngOnInit() {
  }

  onLogin() {
    this.clientsService.postClientToLogin(this.json).subscribe(
      data => {
        if (data) {
          this.clientsService.setToken(data['token']);
          this.clientsService.setUserInfo(data['data']);
          $("#loginModal").hide();
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          location.reload();
        }
      },
      error => {
          this.showAlert = true;
      }

    );


  }

}
