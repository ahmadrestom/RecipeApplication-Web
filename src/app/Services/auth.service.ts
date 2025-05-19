import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';
import { privateUrl, publicUrl } from '../../environments/environment';
import { Role, User } from '../Models/user';
import { Chef } from '../Models/chef';
import { Recipe } from '../Models/recipe';

@Injectable({ providedIn: 'root' })
export class AuthServiceService {

  private readonly authUrl = `${publicUrl}/auth/authenticate`;
  private readonly userUrl = `${privateUrl}/user/getUser`;
  private readonly registerUrl = `${publicUrl}/auth/register`;
  private readonly chefUrl = `${privateUrl}/user/getChefData`;
  private readonly userFavoritesUrl = `${privateUrl}/user/getUserFavorites`;

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  private favoritesSubject = new BehaviorSubject<Recipe[] | null>(null);
  favorites$ = this.favoritesSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  private chefSubject = new BehaviorSubject<Chef | null>(null);
  chef$ = this.chefSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.fetchUserData();
    }
  }

  fetchUserFavorites() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.http.get<Recipe[]>(this.userFavoritesUrl).subscribe({
      next: (data) => {
        if (data == null) {
          this.favoritesSubject.next(null);
        } else {
          this.favoritesSubject.next(data);
        }
      },

      error: (error) => {
        console.error("Error fetching user favorite recipes");
      }
    })
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.authUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        this.isAuthenticated.next(true);
      }),
      tap(() => {
        this.fetchUserData();
        this.router.navigate(['/home']);
      })
    );
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post(this.registerUrl, { firstName, lastName, email, password }).pipe(
      tap(() => {
        this.router.navigate(['/auth'], { queryParams: { mode: 'login' } });
      })
    );
  }

  fetchUserData() {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.http.get<User>(this.userUrl).pipe(
      tap(user => { this.userSubject.next(user) }),
      switchMap(user =>
        user.role.toString() === "CHEF"
          ? this.http.get<Chef>(`${this.chefUrl}/${user.id}`).pipe(
            tap(chef => { this.chefSubject.next(chef) }),
            catchError(err => {
              this.chefSubject.next(null);
              return of(undefined);
            })
          )
          : of(undefined).pipe(
            tap(() => this.chefSubject.next(null))
          )
      ),
      catchError(err => {
        console.error('User fetch failed', err);
        this.logout();
        return of(undefined);
      })
    ).subscribe();
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.isAuthenticated.next(false);
    this.userSubject.next(null);
    this.router.navigate(['']);
    this.favoritesSubject.next(null);
  }

  get isLoggedIn() {
    return this.isAuthenticated.asObservable;
  }
}
