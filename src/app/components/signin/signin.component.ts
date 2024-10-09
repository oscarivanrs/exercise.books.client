import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {
  signInForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
     username: new FormControl(null, Validators.required),
     password: new FormControl(null, Validators.required),
    });
   }
 
   onSubmit() {
    this.auth.signIn(this.signInForm.value.username, this.signInForm.value.password).subscribe((loggedIn) => {
      if (loggedIn) {
        console.log('Log In successful!');
        this.signInForm.reset();
        this.router.navigate(['/']);
      } else {
        console.error('Sign-in failed!');
      }
    });
   }
}
