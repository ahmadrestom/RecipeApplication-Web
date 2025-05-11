import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../Models/review';
import { privateUrl } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewsSubject = new BehaviorSubject<Review[] | null>(null);
  reviews$ = this.reviewsSubject.asObservable();

  private recipeReviewsUrl = `${privateUrl}/review/getRecipeReviews`;
  constructor(private http: HttpClient) { }


  getRecipeReviews(recipeId: string)  {
    this.http.get<Review[]>(`${this.recipeReviewsUrl}/${recipeId}`).subscribe({
      next: (reviews) => this.reviewsSubject.next(reviews),
      error: (error) => console.error('Error fetching reviews')
    })
  }

  // getRecipeReviews(recipeId: string): Observable<Review[]>{
  //   return this.http.get<Review[]>(`${this.recipeReviewsUrl}/${recipeId}`);
  // }
}
