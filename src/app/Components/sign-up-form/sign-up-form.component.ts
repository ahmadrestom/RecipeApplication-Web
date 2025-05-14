import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up-form',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {

  signUpForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService:AuthServiceService){
    this.signUpForm = this.fb.group({
      firstName: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/), Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    },{ validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(Form: FormGroup){
    const password = Form.get('password')?.value;
    const repeatPassword = Form.get('repeatPassword')?.value;
    return password === repeatPassword? null : { passwordsMismatch: true };
  }

  onSubmit(){
    if(this.signUpForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';
    const { firstName, lastName, email, password } = this.signUpForm.value;

    this.authService.signup(firstName!, lastName!, email!, password!).subscribe({
      next: ()=>{
        this.isLoading = false;
      },
      error: (err)=>{
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'SignUp failed';
      }
    })
  }
}