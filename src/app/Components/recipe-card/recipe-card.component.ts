import { Component, Input } from '@angular/core';
import { ChefRecipe, Recipe } from '../../Models/recipe';
import { CommonModule } from '@angular/common';
import { ScrollAnimationDirective } from '../../Directive/scroll-animation.directive';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule,ScrollAnimationDirective],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {

  @Input() recipe: Recipe|null = null;
  @Input() ChefRecipe: ChefRecipe | null = null;

  stars: number[] = [1, 2, 3, 4, 5];

}
