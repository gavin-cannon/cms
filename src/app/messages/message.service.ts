import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }
  getMaxId(): number {
    let maxId = 0;

    for (const message of this.messages) {
        const currentId = Number(message.id);
        if (currentId > maxId) {
            maxId = currentId;
        }
    }
    return maxId;
  }
  
  addMessage(newMessage: Message) {
    if (!newMessage) {
      return;
  }

  this.maxMessageId++;
  newMessage.id = this.maxMessageId.toString();
  this.messages.push(newMessage);

  const messagesListClone = this.messages.slice();
  this.storeMessages();
}
  
  getMessages() {
    // return this.messages.slice();
    this.http.get<Message[]>('https://cms-project-98b35-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (messages: Message[] ) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => {
          if (a.sender < b.sender) {
            return -1;
          } else if (a.sender > b.sender) {
            return 1;
          } else {
            return 0;
          }
        });
        this.messageChangedEvent.next(this.messages.slice());

     }
  )
  return this.messages.slice();
  }
  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  storeMessages() {
    const messageArrayString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-project-98b35-default-rtdb.firebaseio.com/messages.json',
      messageArrayString,
      {headers}
    ).subscribe(() => {
      this.messageChangedEvent.next(this.messages.slice());
    });
  }

  // addMessage(message: Message) {
  //   this.messages.push(message); 
  //   this.messageChangedEvent.emit(this.messages.slice());
  // }
}
