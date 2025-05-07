import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Review } from '../Models/review';
import { privateUrl } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private recipeReviewsUrl = `${privateUrl}/review/getRecipeReviews`;
  constructor(private http: HttpClient) { }

  getRecipeReviews(recipeId: string): Observable<Review[]>{
    return this.http.get<Review[]>(`${this.recipeReviewsUrl}/${recipeId}`);
  }
}
