import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
       private contactService: ContactService,
       private router: Router,
       private route: ActivatedRoute) {
       }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return
        } 
        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return
        }
        this.editMode = true;
        // this.contact = { ... this.originalContact };
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if (this.contact.group) {
          this.groupContacts = {... this.contact.group}
        }
        
      }
    )
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }
  onSubmit(form: NgForm) {
    const values = form.controls;
    const name = values.name.value;
    const email = values.email.value;
    const phone = values.phone.value;
    const imageUrl = values.imageUrl.value;
    const group = [];
    // console.log(name, description, url);
    const newContact = new Contact('', name, email, phone, imageUrl, group );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }
}