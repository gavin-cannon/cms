import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  // maxId: number;
  maxDocumentId: number;
  
  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    console.log(this.documents.length);
    for (const document of this.documents) {
        const currentId = Number(document.id);
        if (currentId > maxId) {
            maxId = currentId;
        }
    }
    return maxId;
  }
  
  addDocument(newDocument: Document) {
    if (!newDocument) {
        return;
    }
    newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: String, document: Document }>('http://localhost:3000/documents',
      newDocument,
      { headers: headers }
    ).subscribe(
      (responseData) => {
        this.documents.push(responseData.document);
        this.documentChangedEvent.next(this.documents.slice());
      }
    );

    // this.maxDocumentId++;
    // newDocument.id = this.maxDocumentId.toString();
    // this.documents.push(newDocument);

    // const documentsListClone = this.documents.slice();
    // this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
        return;  
    }

    const pos = this.documents.indexOf(originalDocument); 
    if (pos < 0) {
        return; 
    }

    newDocument.id = originalDocument.id;  
    this.documents[pos] = newDocument;  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
    // const documentsListClone = this.documents.slice();
    // this.documentChangedEvent.next(documentsListClone); 
    // this.storeDocuments();
  }


  
  getDocuments() {
    this.http.get<Document[]>('http://localhost:3000/documents')
      .subscribe(
        (documents: Document[] ) => {
          this.documents = documents;
          console.log('documents:', documents);
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            } else if (a.name > b.name) {
              return 1;
            } else {
              return 0;
            }
          });
          this.documentChangedEvent.next(this.documents.slice());
       }
    )
    return this.documents.slice();
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
    // this.documents.splice(pos, 1);
    // this.documentChangedEvent.next(this.documents.slice());
    // this.storeDocuments();
 }

  storeDocuments() {
    const documentArrayString = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put('https://cms-project-98b35-default-rtdb.firebaseio.com/documents.json',
      documentArrayString,
      {headers}
    ).subscribe(() => {
      this.documentChangedEvent.next(this.documents.slice());
    });
  }
  
}