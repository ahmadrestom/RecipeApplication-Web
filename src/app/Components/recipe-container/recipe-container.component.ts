import { Component, OnInit } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-container',
  imports: [RecipeCardComponent, CommonModule],
  templateUrl: './recipe-container.component.html',
  styleUrl: './recipe-container.component.scss'
})
export class RecipeContainerComponent implements OnInit{

  constructor(private recipeService: RecipeService){};

  recipes: Recipe[] = [];
  visibleRecipes: Recipe[] = [];
  recentRecipes: Recipe[] = [];
  visibleRecentRecipes: Recipe[] = [];

  recipesToShow = 3;
  increment = 3;
  loadingStates: { [recipeId: string]: boolean } = {};

  ngOnInit(): void {
    this.fetchRecentRecipes();
    this.fetchRecipes();
  }

  viewMore(): void {
    this.recipesToShow += this.increment;
    this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
  }

  fetchRecipes(): void {
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
        this.preloadImages(this.recipes);
      },
      error: (error) => {
        console.error('Error fetching recipes:xx ', error);
      }
    })
  }
  fetchRecentRecipes(): void {
    this.recipeService.getRecentRecipes().subscribe({
      next: (data) => {
        this.recentRecipes = data;
        this.preloadImages(this.recentRecipes);
      },
      error: (error) => {
        console.error('Error fetching recipes: ', error);
      }
    })
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
