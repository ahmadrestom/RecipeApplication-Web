import { Component, OnInit } from '@angular/core';
import { RecipeImagePickerComponent } from '../recipe-image-picker/recipe-image-picker.component';
import { CategoryService } from '../../../Services/category.service';
import { Category } from '../../../Models/category';
import { error } from 'console';
import { NgFor } from '@angular/common';
import { Recipe } from '../../../Models/recipe';
import { DifficultyLevel } from '../../../Models/recipe';

@Component({
  selector: 'app-create-recipe-form',
  imports: [RecipeImagePickerComponent, NgFor],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss'
})
export class CreateRecipeFormComponent implements OnInit{

  categories: Category[] = [];

  

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
      this.getCategories();
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
