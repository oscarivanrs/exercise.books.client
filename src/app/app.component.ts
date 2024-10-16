import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'books';
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.init();
  }
}
