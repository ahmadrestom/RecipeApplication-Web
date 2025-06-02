import { Component, OnInit } from '@angular/core';
import { FavoriteRecipe, Recipe } from '../../Models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { RecipeHeaderComponent } from '../../Components/Recipe-Components/recipe-header/recipe-header.component';
import { MainDivComponent } from '../../Components/Recipe-Components/main-div/main-div.component';
import { SideDivComponent } from '../../Components/Recipe-Components/side-div/side-div.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { AuthServiceService } from '../../Services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent,
     CommonModule,
     RecipeHeaderComponent,
     MainDivComponent,
     SideDivComponent,
     FooterComponent,
    ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})

export class RecipeComponent implements OnInit{

  favoriteRecipes: FavoriteRecipe[] | null = [];
  isFavorite: boolean = false;
  recipeId!: string;
  recipe?: Recipe;

  private favoritesSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private authService: AuthServiceService
  ){};

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
      this.recipe = data;
      this.checkIfFavorite();
    });
    this.fetchUserFavorites();
  }

  fetchUserFavorites(){
    this.authService.fetchUserFavorites();
    this.favoritesSubscription = this.authService.favorites$.subscribe((favorites) => {
      this.favoriteRecipes = favorites;
      this.checkIfFavorite();
    });
  }

  checkIfFavorite() {
    if (this.recipe && this.favoriteRecipes) {
      this.isFavorite = this.favoriteRecipes.some(
        favRecipe => favRecipe.recipeId === this.recipe?.recipeId
      );
    }
  }
  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }
}
