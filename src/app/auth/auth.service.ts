import { environment } from './../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { UserModel } from '../models/user/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageName = "EXERCISE.BOOKS.USER";
  private loggedUser!: UserModel;
  constructor(private http: HttpClient, private router: Router) { }

  init() {
    if(localStorage.getItem(this.storageName)) {
      console.log(localStorage.getItem(this.storageName))
      let storageUser = JSON.parse(localStorage.getItem(this.storageName)!);
      if(new Date().getTime() > storageUser.expiresIn) {
        this.SignOut();
      } else {
        this.setUser(new UserModel(storageUser.usename, storageUser.token, storageUser.expiresIn));
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
      map((response) => {
        console.log(response);
        return true;
      }),
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

  getHeaders(): any {
    if(this.loggedUser) {
      return {
        'Authorization': `Bearer ${this.getToken()}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200'
      }
    }
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    };
  }

  private setUser(user: UserModel | undefined) {
    this.loggedUser = user!;
    if(this.loggedUser) {
      localStorage.setItem(this.storageName, JSON.stringify(this.loggedUser));
    }
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

  getMe():  Observable<any> {
    return this.http
      .get<any>(`${environment.booksEndpoint}${environment.apiUserTest}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map((profile) => {
          return profile;
        })
      );
  }

  SignOut(): void {
    this.setUser(undefined);
    localStorage.removeItem(this.storageName);
    this.router.navigate(['/signin']);
  }
}
