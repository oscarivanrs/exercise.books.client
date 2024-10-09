import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
     username: new FormControl(null, Validators.required),
     password: new FormControl(null, [Validators.required, Validators.pattern(StrongPasswordRegx)]),
    });
   }
 
   onSubmit() {
     console.log(this.signUpForm);
     this.auth.newUser(this.signUpForm.value.username,this.signUpForm.value.password).subscribe({
      next: (data) => {
        console.log('Sign Up successful');
        this.signUpForm.reset();
        this.router.navigate(['/signin']);
      },
      error: (error) => {
        console.error('There was an error!', error.message);
      },
    });
   }

   dialog = inject(MatDialog);

   openDialog() {
    
  }
}
/* https://medium.com/@ojiofor/angular-reactive-forms-strong-password-validation-8dbcce92eb6c */
export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  @Component({
    selector: 'DialogSuccessReg',
    templateUrl: './DialogSuccessReg.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class DialogSuccessReg {}

  @Component({
    selector: 'DialogFailReg',
    templateUrl: './DialogFailReg.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class DialogFailReg {}