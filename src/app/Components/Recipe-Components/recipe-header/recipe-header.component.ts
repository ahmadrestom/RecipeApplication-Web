import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-header',
  imports: [CommonModule],
  templateUrl: './recipe-header.component.html',
  styleUrl: './recipe-header.component.scss'
})
export class RecipeHeaderComponent {

  @Input() recipe: Recipe | null = null;
  stars: number[] = [1, 2, 3, 4, 5];
  @Input() rating: number=0;
}