import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {
  signInForm!: FormGroup;

  dialog = inject(MatDialog);

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
        this.dialog.open(DialogFailedLogin);
      }
    });
   }
}

@Component({
  selector: 'DialogFailedLogin',
  templateUrl: './DialogFailedLogin.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogFailedLogin {}
