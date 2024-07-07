import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = []

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    // const contacts = this.contactService.getContacts();
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    })
  }
  constructor(private messageService: MessageService, private contactService: ContactService) {
  }
}
