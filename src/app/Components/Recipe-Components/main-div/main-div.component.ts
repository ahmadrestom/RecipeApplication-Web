import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';

@Component({
  selector: 'app-main-div',
  imports: [],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent {
  @Input() recipe!: Recipe;
}
