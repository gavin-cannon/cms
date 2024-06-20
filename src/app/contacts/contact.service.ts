import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();
  maxContactId: number;
  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;

    for (const contact of this.contacts) {
        const currentId = Number(contact.id);
        if (currentId > maxId) {
            maxId = currentId;
        }
    }
    return maxId;
  }

  // getContacts(): Contact[]{
  //   return this.contacts.slice();
  // }

    
  getContacts() {
    this.http.get<Contact[]>('https://cms-project-98b35-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[] ) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          this.contactChangedEvent.next(this.contacts.slice());

       }
    )
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  addContact(newContact: Contact) {
    if (!newContact) {
        return;
    }

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);

    const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    this.storeContacts();
  }


  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
        return;  
    }

    const pos = this.contacts.indexOf(originalContact); 
    if (pos < 0) {
        return; 
    }

    newContact.id = originalContact.id;  
    this.contacts[pos] = newContact;  

    // const contactsListClone = this.contacts.slice();
    // this.contactChangedEvent.next(contactsListClone);
    this.storeContacts();
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
   }
   const pos = this.contacts.indexOf(contact);
   if (pos < 0) {
      return;
   }
   this.contacts.splice(pos, 1);
    //  this.contactChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  storeContacts() {
    const contactArrayString = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-project-98b35-default-rtdb.firebaseio.com/contacts.json',
      contactArrayString,
      {headers}
    ).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    });
  }
  
}
