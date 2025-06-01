import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { NiComponent } from '../ni/ni.component';
import { RecipeCardComponent } from "../../recipe-card/recipe-card.component";
import { RecipeContainerComponent } from '../../recipe-container/recipe-container.component';
import { NgClass, NgFor } from '@angular/common';
import { RecipeService } from '../../../Services/recipe.service';

@Component({
  selector: 'app-side-div',
  imports: [NiComponent, NgFor, RecipeCardComponent],
  templateUrl: './side-div.component.html',
  styleUrl: './side-div.component.scss'
})
export class SideDivComponent implements OnInit{

  recentRecipes: Recipe[] | undefined = [];

  @Input() recipe!:Recipe;

  constructor(private recipeService: RecipeService){}

  ngOnInit(): void {
      this.fetchRecentRecipes();
  }

  fetchRecentRecipes(){
    this.recipeService.getRecentRecipes();
    this.recipeService.recentRecipes$.subscribe((recipes) => {
      this.recentRecipes = recipes?.slice(0,3);
    }) 
  }

}
