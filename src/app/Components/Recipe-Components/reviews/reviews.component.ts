import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Review } from '../../../Models/review';
import { ReviewComponent } from '../review/review.component';
import { NgFor } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-reviews',
  imports: [ReviewComponent, NgFor,ButtonComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent{

  @Input() reviews!: Review[];

}
