import { Component, NgModule, OnInit } from '@angular/core';
import { RecipeImagePickerComponent } from '../recipe-image-picker/recipe-image-picker.component';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../Models/category';
import { NgFor } from '@angular/common';
import { PostRecipeDTO } from '../../../Models/recipe';
import { DifficultyLevel } from '../../../Models/recipe';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: 'app-create-recipe-form',
  imports: [RecipeImagePickerComponent, NgFor, FormsModule, ButtonComponent],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss'
})
export class CreateRecipeFormComponent implements OnInit{

  recipe: PostRecipeDTO = {
    recipeName: '',
    description: '',
    preparationTime: null,
    cookingTime: null,
    difficultyLevel: '' as any,
    rating: 3,
    imageUrl: '',
    plateImageUrl: '',
    categoryId: '',
    chefId: '',
    ni : {
      calories: null,
      total_fat: null,
      cholesterol: null,
      carbohydrates: null,
      protein: null,
      sugar: null,
      sodium: null,
      fiber: null,
      zinc: null,
      magnesium: null,
      potassium: null
    },
    ingredients:[{ingredientName: '', grams:null}],
    instructions: [{order:null, instruction:''}]
  }

  categories: Category[] = [];
  constructor(private categoryService: CategoryService){
    
  }

  ngOnInit(): void {
      this.getCategories();
  }

  addIngredient(){
    this.recipe.ingredients.push({ingredientName:'', grams:null});
  }
  addInstruction(){
    this.recipe.instructions.push({
      order: this.recipe.instructions.length+1,
      instruction: ''
    });
  }

  getCategories(){
    return this.categoryService.getAllCategories().subscribe({
      next: (data)=>{
        this.categories = data;
      },
      error: (err)=>{
        console.error("Error fetching categories");
      }
    })
  }
}