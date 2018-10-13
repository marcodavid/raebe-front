import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ClientsService } from '../../services/clients-service/clients.service';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateX(-20%)',
        opacity : .8
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
export class AgreementComponent implements OnInit {
  private user: any
  constructor(private clientService: ClientsService) { }

  ngOnInit() {
    this.user = JSON.parse(this.clientService.getUserInfo());
   
  }

  isFullData() {
    if(this.user.fulldata)
      return true;
    else false;
  }

}
