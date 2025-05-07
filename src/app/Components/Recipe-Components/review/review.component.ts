import { Component, Input } from '@angular/core';
import { Review } from '../../../Models/review';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../Pipes/time-ago.pipe';

@Component({
  selector: 'app-review',
  imports: [CommonModule,TimeAgoPipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() review!: Review;

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/icons/user.png';
  }

}
