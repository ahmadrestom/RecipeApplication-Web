import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthServiceService){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators]],
      password: ['',Validators.required]
    });
  };
  

  onSubmit(){
    if(this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage= '';
    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err)=>{
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    })
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }


}
