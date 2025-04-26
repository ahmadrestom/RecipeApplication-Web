import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-card',
  imports: [CommonModule],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.scss'
})
export class RatingCardComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  @Input() rating: number=0;

  setRating(star: number) {
    this.rating = star;
  }

}
