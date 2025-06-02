import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth.service';
import { FavoriteRecipe, Recipe } from '../../Models/recipe';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RecipeCardComponent } from "../../Components/recipe-card/recipe-card.component";

@Component({
  selector: 'app-saved-recipes',
  imports: [HeaderComponent, FooterComponent, CommonModule, RouterLink, RecipeCardComponent],
  templateUrl: './saved-recipes.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './saved-recipes.component.scss'
})
export class SavedRecipesComponent implements OnInit{

  recipes: FavoriteRecipe[] | null = [];

  constructor(private authService: AuthServiceService){}

  ngOnInit(): void {
      this.authService.fetchUserFavorites();
      this.authService.favorites$.subscribe( recipes => {
          this.recipes = recipes;
      })
  }
}