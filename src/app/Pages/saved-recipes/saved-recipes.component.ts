import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth.service';
import { Recipe } from '../../Models/recipe';
import { RecipeContainerComponent } from "../../Components/recipe-container/recipe-container.component";
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  imports: [RecipeContainerComponent, HeaderComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './saved-recipes.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './saved-recipes.component.scss'
})
export class SavedRecipesComponent implements OnInit{

  recipes: Recipe[] | null = [];

  constructor(private authService: AuthServiceService){}

  ngOnInit(): void {
      this.authService.fetchUserFavorites();
      this.authService.favorites$.subscribe( recipes => {
        if(recipes != null){
          this.recipes = recipes;
        }
      })
  }
}
