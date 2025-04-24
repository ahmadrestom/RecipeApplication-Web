import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthServiceService {
  private readonly authUrl = 'http://localhost:8080/api/v1/auth/authenticate';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  login(email:string, password:string){
    return this.http.post<{token:string}>(this.authUrl, {email,password}).pipe(
        tap(response =>{
          localStorage.setItem('auth_token', response.token);
          this.isAuthenticated.next(true);
          this.router.navigate(['/home']);
        })
    )
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.isAuthenticated.next(false);
    this.router.navigate(['']);
  }

  get isLoggedIn(){
    return this.isAuthenticated.asObservable;
  }

}
