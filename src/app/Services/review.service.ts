import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../Models/review';
import { privateUrl } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviewsSubject = new BehaviorSubject<Review[]>([]);
  reviews$ = this.reviewsSubject.asObservable();

  private readonly recipeReviewsUrl = `${privateUrl}/review/getRecipeReviews`;
  private readonly postRecipeUrl = `${privateUrl}/review/addReview`;

  constructor(private http: HttpClient) { }

  getRecipeReviews(recipeId: string) {
    this.http.get<Review[]>(`${this.recipeReviewsUrl}/${recipeId}`).subscribe({
      next: (reviews) => this.reviewsSubject.next(reviews),
      error: (error) => console.error('Error fetching reviews')
    })
  }

  postReview(recipeId: string, reviewText: string){
    this.http.post<Review>(`${this.postRecipeUrl}/${recipeId}`, reviewText).subscribe({
      next: (response: Review) => {
        console.log(response);
        const prev = this.reviewsSubject.value || [];
        this.reviewsSubject.next([...prev, response]);
      },
      error: (err) => {
        console.error("Error adding review",err);
      }
    })
  }
}
