import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-rating-card',
  imports: [CommonModule],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.scss',
  encapsulation: ViewEncapsulation.None //note: this method here will alllow external css to affect it,
})
export class RatingCardComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  @Input() rating: number=0;
  @Input() name: string = '';
  @Input() review: string='';
  @Input() imageUrl: string = '';

  setRating(star: number) {
    this.rating = star;
  }

}
