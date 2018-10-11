import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations : [
    trigger('animacionAparecer', [
      state('void', style({
        transform : 'translateY(-5%)',
        opacity : .5
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
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  getConversations() { }

  getConversationMessages() { }

  sendMessage(idConversation: number) { }

  recieveMessage(idConversation: number) { }
}
