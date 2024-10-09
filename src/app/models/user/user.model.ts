import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.model.html',
  styleUrl: './user.model.css'
})
export class UserModel {
  constructor(@Inject('username') private username: string, @Inject('token') private token: string, @Inject('expiresIn') private expiresIn: number) {}

  getUsername(): string {
    return this.username;
  }

  getToken(): string {
    return this.token;
  }

  getExpiresIn(): number {
    return this.expiresIn;
  }
}
