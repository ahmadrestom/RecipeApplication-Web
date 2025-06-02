import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { NiComponent } from '../ni/ni.component';
import { RecipeCardComponent } from "../../recipe-card/recipe-card.component";
import { NgFor } from '@angular/common';
import { RecipeService } from '../../../Services/recipe.service';
import { NewSettlerComponent } from "../../new-settler/new-settler.component";

@Component({
  selector: 'app-side-div',
  imports: [NiComponent, NgFor, RecipeCardComponent, NewSettlerComponent],
  templateUrl: './side-div.component.html',
  styleUrl: './side-div.component.scss'
})
export class SideDivComponent implements OnInit, OnChanges {

  recentRecipes: Recipe[] | undefined = [];
  relatedRecipes: Recipe[] | undefined = [];

  @Input() recipe!: Recipe;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.fetchRecentRecipes();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipe']?.currentValue) {
      this.fetchRelatedRecipes();
    }
  }


  fetchRecentRecipes() {
    this.recipeService.getRecentRecipes();
    this.recipeService.recentRecipes$.subscribe((recipes) => {
      this.recentRecipes = recipes?.slice(0, 3);
    })
  }

  fetchRelatedRecipes() {
    this.recipeService.getRecipesByCategory(this.recipe.category.category_name);
    this.recipeService.recipesByCategory$.subscribe((recipes) => {
      const filtered = recipes?.filter(
      r => r.recipeName !== this.recipe.recipeName
    );
      this.relatedRecipes = filtered;
    })
  }
}