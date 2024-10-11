import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

export interface Profilo {
  uid: number;
  username: string;
  password: string;
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  authorities: [];
} 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile: Profilo | undefined;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getMe().subscribe((data)=>{
      console.log(data);
      this.profile = data;
    });
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }
}
