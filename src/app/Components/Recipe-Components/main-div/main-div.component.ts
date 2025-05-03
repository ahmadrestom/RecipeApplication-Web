import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { PrintRecipeComponent } from '../print-recipe/print-recipe.component';

@Component({
  selector: 'app-main-div',
  imports: [IngredientsComponent,InstructionsComponent,PrintRecipeComponent],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {
  @Input() recipe!: Recipe;
}
