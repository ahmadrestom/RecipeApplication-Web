import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { privateUrl, publicUrl } from '../../environments/environment';
import { User } from '../Models/user';

@Injectable({providedIn: 'root'})
export class AuthServiceService{

  private readonly authUrl = `${publicUrl}/auth/authenticate`;
  private readonly userUrl = `${privateUrl}/user/getUser`;
  private readonly registerUrl = `${publicUrl}/auth/register`;

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.fetchUserData();
    }
   }

  login(email:string, password:string){
    return this.http.post<{token:string}>(this.authUrl, {email,password}).pipe(
        tap(response =>{
          localStorage.setItem('auth_token', response.token);
          this.isAuthenticated.next(true);
        }),
        tap(()=>{
          this.fetchUserData();
          this.router.navigate(['/home']);
        })
    );
  }

  signup(firstName: string, lastName: string, email:string, password:string){
    return this.http.post(this.registerUrl, {firstName, lastName, email, password}).pipe(
      tap(() => {
        this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
      })      
    );
  }

  fetchUserData(){
    const token = localStorage.getItem('auth_token');
    if(!token) return;
    this.http.get<User>(this.userUrl).subscribe({
      next: user=>this.userSubject.next(user),
      error: err=>{
        console.log("Error fetching user data"),
        this.logout();
      }
    });
  }

  logout(){
    localStorage.removeItem('auth_token');
    this.isAuthenticated.next(false);
    this.userSubject.next(null);
    this.router.navigate(['']);
  }

  get isLoggedIn(){
    return this.isAuthenticated.asObservable;
  }

}
