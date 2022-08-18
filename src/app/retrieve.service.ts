import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetrieveService {

  constructor(private http: HttpClient) { }

  getCollection(collectionName: string) {
    if (collectionName === "blogs"){
      return this.http.get(`${environment.port}/get-blog`)
    } else if (collectionName === "projects"){
      return this.http.get(`${environment.port}/get-projects`)
    } else {
      return this.http.get(`${environment.port}/get-works`)
    }
  }

  getDocument(collectionName: string, documentId: string) {
    if (collectionName === "blogs"){
      return this.http.get(`${environment.port}/get-article/${documentId}`)
    } else if (collectionName === "projects"){
      return this.http.get(`${environment.port}/get-project/${documentId}`)
    } else {
      return this.http.get(`${environment.port}/get-works/${documentId}`)
    }
  }
}
