import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval } from 'rxjs';
import { map, share } from 'rxjs/operators';

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
  message: string;
  conversationsInterval: any;
  messagesInterval: any;
  idConversation: number;

  constructor() {
    this.message = '';
    this.idConversation = 0;
    this.conversationsInterval = interval(5000).subscribe( (event) => {
      this.getConversations();
    });

    this.messagesInterval = interval(1500).pipe(
      map((event) => {
          this.getConversationMessages(this.idConversation);
        }
      ),
      share()
    );
  }

  ngOnInit() { }

  getConversations() {
    // en este se obtendrá si tienen mensajes o no cada cierto tiempo
    alert('recibiendo conversaciones');
  }

  // evento de click sobre la conversación
  getConversationMessages(idConversation: number) {
    // decirle a la api que se abrió una conversación para marcarla
    // como leída.
    alert('Mostrando chat con id ' + idConversation);
    this.idConversation = idConversation;
    this.recieveMessages(idConversation);
  }

  sendMessage(idConversation: number) {
    alert('Enviando mensaje "' + this.message + '" para la conversación ' + idConversation);
    // se le manda a la API el mensaje
    this.message = '';
  }

  recieveMessages(idConversation: number) {
    alert('recibiendo mensajes');
  }
}
