import { Component, Input, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipe-container',
  imports: [RecipeCardComponent, CommonModule, RouterLink],
  templateUrl: './recipe-container.component.html',
  styleUrl: './recipe-container.component.scss'
})
export class RecipeContainerComponent implements OnInit{

  constructor(private recipeService: RecipeService, private router: Router){};

  @Input() title:string = '';
  
  recipes: Recipe[] = [];

  recentRecipes: Recipe[] = [];

  visibleRecipes: Recipe[] = [];
  visibleRecentRecipes: Recipe[] = [];

  recipesToShow = 3;
  increment = 3;
  recentRecipesToShow = 3;
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
    if(this.recipesToShow >=6){
      this.router.navigate(['/view-recipes']);

    }else{
    this.recipesToShow += this.increment;
    this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
    }
  }
  viewMoreRecentRecipes(): void{
    this.recentRecipesToShow += this.increment;
    this.visibleRecentRecipes = this.recentRecipes.slice(0, this.recentRecipesToShow);
  }

  shouldShowViewMore() {
    return (this.title === 'Explore Recipes' && this.recipesToShow < this.recipes.length) ||
           (this.title === 'Trending Recipes' && this.recentRecipesToShow < this.recentRecipes.length);
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
