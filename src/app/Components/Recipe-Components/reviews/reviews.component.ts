import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Review } from '../../../Models/review';
import { ReviewComponent } from '../review/review.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../Services/review.service';

@Component({
  selector: 'app-reviews',
  imports: [ReviewComponent, NgFor, ButtonComponent, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  @Input() reviews!: Review[];
  @Input() recipeId!: string;

  reviewText: string = '';

  constructor(private reviewsService: ReviewService){}

  postReview(reviewText: string, recipeId: string): void {
    this.reviewsService.postReview(recipeId, reviewText);
  }

  onPostReview = () => {
    this.postReview(this.reviewText, this.recipeId);
  }

}
