import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { InstructionsComponent } from '../instructions/instructions.component';

@Component({
  selector: 'app-main-div',
  imports: [IngredientsComponent,InstructionsComponent],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {
  @Input() recipe!: Recipe;
}
