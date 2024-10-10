import { environment } from './../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user/user.model';

const staticHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageName = "EXERCISE.BOOKS.USER";
  private loggedUser!: UserModel;
  constructor(private http: HttpClient) { }

  init() {
    if(localStorage.getItem(this.storageName)) {
      this.setUser(JSON.parse(localStorage.getItem(this.storageName)!));
      if(new Date().getTime() > this.loggedUser.getExpiresIn()) {
        this.SignOut();
      }
    }
  }

  isLogged() {
    if(this.loggedUser!=null) {
      if(new Date().getTime() > this.loggedUser.getExpiresIn()) {
        this.SignOut();
      }
      return true;
    } else {
      return false;
    }
  }

  newUser(username: string, password: string): Observable<boolean> {
    console.log(username)
    return this.http.post<any>(`${environment.authEndpoint}${environment.apiUserReg}`,{username: username, password: password}).pipe(
      map((response: { success: any; }) => !!response.success),  // Oppure !!response (se la proprietà success indica il successo)
      // Gestire eventuali errori
      catchError(error => {
        console.error('Errore durante la registrazione del nuovo utente:', error);
        return of(false);  // Restituisci false in caso di errore
      })
    );
  }

  signIn(username: string, password: string): Observable<boolean> {
    const body = {
      username: username,
      password: password
    };
    console.log(`logging ... ${body.username} to ${environment.authEndpoint}${environment.apiUserSignIn}`);
    return this.http.post<any>(`${environment.authEndpoint}${environment.apiUserSignIn}`, body, { headers: this.getHeaders() }).pipe(map(userData => {
        console.log('signIn successful');
        const expirationDate: number = new Date( new Date().getTime() + userData.expiresIn * 1000 ).getTime();
        this.setUser(new UserModel(username, userData.token, expirationDate));
        return true;
    }),
    tap((response: any) => {
      console.log('Risposta HTTP:', response);
      console.log('Codice di stato:', response.status);
    }),
    catchError((error) => {
      console.log('Si è verificato un errore durante il login:', error);
      console.log('Codice di stato:', error.status);
      return of(false);
    }));
  }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders(staticHeaders);
    if(this.loggedUser) {
      headers = headers.append('Authorization', `Bearer ${this.getToken()}`);
    }
    return headers;
  }

  private setUser(user: UserModel | undefined) {
    this.loggedUser = user!;
    console.log(this.loggedUser);
    localStorage.setItem(this.storageName, JSON.stringify(this.loggedUser));
  }

  getToken(): string | undefined {
    console.log(this.loggedUser);
    if(this.isLogged()) {
      console.log(this.loggedUser.getToken());
      return this.loggedUser.getToken();
    }else {
      return undefined;
    }
  }

  SignOut(): void {
    this.setUser(undefined);
    localStorage.removeItem(this.storageName);
  }
}
