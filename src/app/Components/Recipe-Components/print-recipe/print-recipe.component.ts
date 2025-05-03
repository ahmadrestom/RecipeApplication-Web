import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { CommonModule } from '@angular/common';
import { IngredientsComponent } from "../ingredients/ingredients.component";
import { InstructionsComponent } from "../instructions/instructions.component";

@Component({
  selector: 'app-print-recipe',
  imports: [CommonModule, IngredientsComponent, InstructionsComponent],
  templateUrl: './print-recipe.component.html',
  styleUrl: './print-recipe.component.scss'
})
export class PrintRecipeComponent {
  @Input() recipe!:Recipe;
  stars: number[] = [1, 2, 3, 4, 5];
}
