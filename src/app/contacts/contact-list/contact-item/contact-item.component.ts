import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.css'
})
export class ContactItemComponent {
  @Output() contactSelected = new EventEmitter<void>();
  @Input() contact: Contact;

  onSelected() {
    this.contactSelected.emit();
  }
}
