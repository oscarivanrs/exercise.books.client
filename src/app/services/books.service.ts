import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment'
import { AuthService } from '../auth/auth.service';
import { BookModel } from '../models/book/book.model';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  listBooks(): Observable<BookModel[]> {
    return this.http.get<BookModel[]>(`${environment.booksEndpoint}${environment.apiBooksList}`,{ headers: this.auth.getHeaders() }).pipe(map(book => Object.values(book)));
  }

  addBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>(`${environment.booksEndpoint}${environment.apiBooksAdd}`, book,{ headers: this.auth.getHeaders() }).pipe(map(book => {
      return book;
    }));
  }

  delBook(book: BookModel): Observable<boolean> {
    return this.http.delete<BookModel>(`${environment.booksEndpoint}${environment.apiBooksDelete}`, { body: book, headers: this.auth.getHeaders() }).pipe(
      map((response) => {
        return true;
      }),
      catchError(error => {
        console.error('Errore durante la delete:', error);
        return of(false); 
      })
    );
  }
}
