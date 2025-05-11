import { Component, Input, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-container',
  imports: [RecipeCardComponent, CommonModule, RouterLink],
  templateUrl: './recipe-container.component.html',
  styleUrl: './recipe-container.component.scss'
})
export class RecipeContainerComponent implements OnInit{

  constructor(private recipeService: RecipeService){};

  @Input() title:string = '';
  @Input() layoutType: 'grid' | 'list' = 'grid';


  recipes: Recipe[] = [];
  visibleRecipes: Recipe[] = [];
  recentRecipes: Recipe[] = [];
  visibleRecentRecipes: Recipe[] = [];

  recipesToShow = 3;
  increment = 3;
  recentRecipesToShow = 3;
  incrementr = 2;
  loadingStates: { [recipeId: string]: boolean } = {};

  ngOnInit(): void {
    this.recipeService.getRecipes();
    this.recipeService.getRecentRecipes();

    this.recipeService.recipes$.subscribe(recipes => {
      if (recipes) {
        this.recipes = recipes;
        this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
        this.preloadImages(this.recipes);
      }
    });

    this.recipeService.recentRecipes$.subscribe(recentRecipes => {
      if (recentRecipes) {
        this.recentRecipes = recentRecipes;
        this.visibleRecentRecipes = this.recentRecipes.slice(0, this.recentRecipesToShow);
        this.preloadImages(this.recentRecipes);
      }
    });
  }

  viewMoreRecipes(): void {
    this.recipesToShow += this.increment;
    this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
  }
  viewMoreRecentRecipes(): void{
    this.recentRecipesToShow += this.incrementr;
    this.visibleRecentRecipes = this.recentRecipes.slice(0, this.recentRecipesToShow);
  }

  preloadImages(recipes: Recipe[]): void {
    recipes.forEach(recipe => {
      this.loadingStates[recipe.recipeId] = true;
      this.loadImage(recipe.imageUrl).then(() => {
        this.loadingStates[recipe.recipeId] = false;
      }).catch(() => {
        this.loadingStates[recipe.recipeId] = false;
      });
      if (recipe.plateImageUrl) {
        this.loadImage(recipe.plateImageUrl);
      }
    });
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  }
}
