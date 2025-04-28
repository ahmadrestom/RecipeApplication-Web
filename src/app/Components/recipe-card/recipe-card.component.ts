import { Component, Input } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe: Recipe|null = null; 

  stars: number[] = [1, 2, 3, 4, 5];

}
