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
  @Input() recipes?: Recipe[]| null = [];  

  recipesToShow = 3;
  increment = 3;
  recentRecipesToShow = 3;
  

  ngOnInit(): void {
    // this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
    // this.visibleRecentRecipes = this.recentRecipes.slice(0, this.recentRecipesToShow);
  }

  viewMoreRecipes():void{
    this.router.navigate(['/view-recipes']);
  }

  // viewMoreRecipes(): void {
  //   if(this.recipesToShow >=6){
  //     this.router.navigate(['/view-recipes']);

  //   }else{
  //   this.recipesToShow += this.increment;
  //   this.visibleRecipes = this.recipes.slice(0, this.recipesToShow);
  //   }
  // }
  // viewMoreRecentRecipes(): void{
  //   this.recentRecipesToShow += this.increment;
  //   this.visibleRecentRecipes = this.recipes.slice(0, this.recentRecipesToShow);
  // }

  // shouldShowViewMore() {
  //   return (this.title === 'Explore Recipes' && this.recipesToShow < this.recipes.length) ||
  //          (this.title === 'Trending Recipes' && this.recentRecipesToShow < this.recipes.length);
  // }

  
}
