import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { HeaderComponent } from '../../Components/header/header.component';
import { CommonModule } from '@angular/common';
import { RecipeHeaderComponent } from '../../Components/Recipe-Components/recipe-header/recipe-header.component';

@Component({
  selector: 'app-recipe',
  imports: [HeaderComponent, CommonModule,RecipeHeaderComponent],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{

  recipeId!: string;
  recipe?: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ){};

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id')!;
    this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
      this.recipe = data;
    });
  }
}
