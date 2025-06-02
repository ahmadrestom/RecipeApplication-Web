import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-header',
  imports: [CommonModule],
  templateUrl: './recipe-header.component.html',
  styleUrl: './recipe-header.component.scss'
})
export class RecipeHeaderComponent {

  constructor(private router: Router){}

  @Input() recipe: Recipe | null = null;
  stars: number[] = [1, 2, 3, 4, 5];
  @Input() rating: number=0;
  @Input() reviewsCount!: number;
  @Input() isFavorite!: boolean;

  navigate(): void {
    console.log("Sending chef id now --->>>");
    this.router.navigate(['/chef-info'], { queryParams: { id: this.recipe?.chef.chefId } });
  }

}