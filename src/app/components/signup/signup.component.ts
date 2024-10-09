import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
     username: new FormControl(null, Validators.required),
     password: new FormControl(null, [Validators.required, Validators.pattern(StrongPasswordRegx)]),
    });
   }
 
   onSubmit() {
     console.log(this.signUpForm);
   }
}
/* https://medium.com/@ojiofor/angular-reactive-forms-strong-password-validation-8dbcce92eb6c */
export const StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;