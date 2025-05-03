import { Component, Input } from '@angular/core';
import { Ingredient } from '../../../Models/Ingredient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients',
  imports: [CommonModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent {

  @Input() ingredients!: Ingredient[];

}
