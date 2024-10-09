import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent {
  signInForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
     username: new FormControl(null, Validators.required),
     password: new FormControl(null, Validators.required),
    });
   }
 
   onSubmit() {
     console.log(this.signInForm);
   }
}
