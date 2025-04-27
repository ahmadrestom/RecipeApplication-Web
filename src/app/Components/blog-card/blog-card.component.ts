import { Component, Input } from '@angular/core';
import { Blog } from '../../Models/blog';

@Component({
  selector: 'app-blog-card',
  imports: [],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {

  @Input() blog: Blog | null = null;
}
