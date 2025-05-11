import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { NiComponent } from '../ni/ni.component';
import { RecipeCardComponent } from "../../recipe-card/recipe-card.component";
import { RecipeContainerComponent } from '../../recipe-container/recipe-container.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-div',
  imports: [NiComponent,RecipeContainerComponent,NgClass],
  templateUrl: './side-div.component.html',
  styleUrl: './side-div.component.scss'
})
export class SideDivComponent {

  @Input() recipe!:Recipe;

}
