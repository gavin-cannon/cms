import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
  new Message(0, 'hi', 'whats up', 'larry'),
  new Message(0, 'hi', 'whats up', 'jerry'),
   new Message(0, 'hi', 'whats up', 'garry'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

}
