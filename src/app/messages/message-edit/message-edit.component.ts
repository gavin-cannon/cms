import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgText', { static: false }) messageInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Gavin Cannon'
 
  constructor(private messageService: MessageService) { }
  ngOnInit(): void {
  
  }
  onSendMessage() {
    event.preventDefault();
    const subject = this.subjectInputRef.nativeElement.value;
    const message = this.messageInputRef.nativeElement.value;
    const newMessage = new Message('777', subject, message, '7');
    this.messageService.addMessage(newMessage);
    // const newMessage = new Message(777, subject, message, this.currentSender);
    // this.addMessageEvent.emit(newMessage)
  }
  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.messageInputRef.nativeElement.value = '';
  }
}
