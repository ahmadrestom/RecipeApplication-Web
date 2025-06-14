import { Component, Input } from '@angular/core';
import { ChefRecipe, FavoriteRecipe, Recipe } from '../../Models/recipe';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../Directive/scroll-animation.directive';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule,ScrollAnimationDirective],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() variant: 'default' | 'minimal' = 'default';
  @Input() recipe: Recipe|null = null;
  @Input() ChefRecipe: ChefRecipe | null = null;
  @Input() favoriteRecipe: FavoriteRecipe | null = null;
  stars: number[] = [1, 2, 3, 4, 5];
}