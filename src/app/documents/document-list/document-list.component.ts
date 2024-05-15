import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    {
      id: 1,
      name: 'Document One',
      description: 'This is the first document.',
      url: 'https://example.com/document-one',
      children: []
    },
    {
      id: 2,
      name: 'Document Two',
      description: 'This is the second document.',
      url: 'https://example.com/document-two',
      children: []
    },
    {
      id: 3,
      name: 'Document Three',
      description: 'This is the third document.',
      url: 'https://example.com/document-three',
      children: []
    },
    {
      id: 4,
      name: 'Document Four',
      description: 'This is the fourth document.',
      url: 'https://example.com/document-four',
      children: []
    },
    {
      id: 5,
      name: 'Document Five',
      description: 'This is the fifth document.',
      url: 'https://example.com/document-five',
      children: []
    }
  ];
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
