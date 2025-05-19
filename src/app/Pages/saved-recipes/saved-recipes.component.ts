import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth.service';
import { Recipe } from '../../Models/recipe';
import { RecipeContainerComponent } from "../../Components/recipe-container/recipe-container.component";

@Component({
  selector: 'app-saved-recipes',
  imports: [RecipeContainerComponent],
  templateUrl: './saved-recipes.component.html',
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
