import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { AuthService } from '../auth/auth.service';
import { BookModel } from '../models/book/book.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  listBooks(): Observable<BookModel[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
    return this.http.get<BookModel[]>(`${environment.booksEndpoint}${environment.apiBooksList}`,{ headers }).pipe(map(book => Object.values(book)));
  }
}
