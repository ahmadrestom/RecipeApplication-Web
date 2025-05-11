import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { IngredientsComponent } from '../ingredients/ingredients.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { PrintRecipeComponent } from '../print-recipe/print-recipe.component';
import { Review } from '../../../Models/review';
import { ReviewService } from '../../../Services/review.service';
import { NgFor } from '@angular/common';
import { ReviewsComponent } from '../reviews/reviews.component';

@Component({
  selector: 'app-main-div',
  imports: [IngredientsComponent, InstructionsComponent, PrintRecipeComponent,ReviewsComponent],
  templateUrl: './main-div.component.html',
  styleUrl: './main-div.component.scss'
})
export class MainDivComponent implements OnInit{
  reviews: Review[] = [];
  constructor(private reviewsService: ReviewService) { }
  private _recipe!: Recipe;

  @Input()
  set recipe(value: Recipe) {
    this._recipe = value;
    if (this._recipe?.recipeId) {
      this.fetchReviews();
    }
  }

  ngOnInit(): void {
      this.reviewsService.getRecipeReviews(this.recipe.recipeId);this.fetchReviews();
      
  }

  get recipe(): Recipe {
    return this._recipe;
  }

  fetchReviews(): void {
    this.reviewsService.reviews$.subscribe(reviews=>{
      if(reviews){
        this.reviews = reviews;
      }
    })
  }


  printRecipe() {
    window.print();
  }
}
