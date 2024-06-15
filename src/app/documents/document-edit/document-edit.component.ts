import { Component, OnInit, ViewChild } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalDocument = this.documentService.getDocument(id);

        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = { ...this.originalDocument };
      }
    );
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const values = form.controls;
    const name = values.name.value;
    const description = values.description.value;
    const url = values.url.value;
    console.log(name, description, url);
    const newDoc = new Document('', name, description, url, []);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDoc);
    } else {
      this.documentService.addDocument(newDoc);
    }
    this.router.navigate(['/documents']);
  }
}
