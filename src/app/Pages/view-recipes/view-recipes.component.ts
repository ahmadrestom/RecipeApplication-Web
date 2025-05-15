import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { RecipeCardComponent } from '../../Components/recipe-card/recipe-card.component';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent, FooterComponent, RecipeCardComponent, NgFor, RouterLink],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.scss'
})
export class ViewRecipesComponent implements OnInit {

  AppRecipes: Recipe[] | null = [];

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit(): void {

    this.recipeService.getRecipes();
    this.recipeService.recipes$.subscribe(recipes => {
      this.AppRecipes = recipes;
    })

  }
}
