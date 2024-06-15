import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents: Document[] = [];
  subscription: Subscription;
  constructor(private documentService: DocumentService) { }
  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
  }
  drop(event) {
    console.log(event);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
