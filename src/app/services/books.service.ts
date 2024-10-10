import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { AuthService } from '../auth/auth.service';
import { BookModel } from '../models/book/book.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  listBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${environment.booksEndpoint}${environment.apiBooksList}`,{ headers: this.auth.getHeaders() }).pipe(map(book => Object.values(book)));
  }
}
