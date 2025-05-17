import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeContainerComponent } from "../../Components/recipe-container/recipe-container.component";

@Component({
  selector: 'app-view-recipes',
  imports: [HeaderComponent, FooterComponent, RecipeContainerComponent],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.scss'
})
export class ViewRecipesComponent implements OnInit {

  AppRecipes: Recipe[] | null = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const category = this.route.snapshot.paramMap.get('category');
    if (category) {
      this.recipeService.getRecipesByCategory(category);
      this.recipeService.recipesByCategory$.subscribe(recipes => {
        console.log(recipes)
        this.AppRecipes = recipes;
      })
    } else {
      this.recipeService.getAllRecipes();
      this.recipeService.allRecipes$.subscribe(recipes => {
        this.AppRecipes = recipes;
      })
    }
  }
}