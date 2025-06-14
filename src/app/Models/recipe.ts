import { Category } from "./category";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";
import { NutritionInformation } from "./NutritionInformation";
import { Review } from "./review";

export enum DifficultyLevel{
    Easy, Medium, Hard
}

export interface Recipe {
    recipeId: string;
    recipeName: string;
    description:string;
    timeUploaded: string;
    preparationTime: number;
    cookingTime: number;
    difficultyLevel: DifficultyLevel;
    rating: number;
    imageUrl: string;
    plateImageUrl: string;
    category: Category;
    chef: ChefForRecipe;
    ni:NutritionInformation;
    ingredients: Ingredient[];
    instructions: Instruction[];
    reviews: Review[];
}

export interface FavoriteRecipe{
    recipeId: string;
    recipeName: string;
    description:string;
    timeUploaded: string;
    preparationTime: number;
    cookingTime: number;
    difficultyLevel: DifficultyLevel;
    rating: number;
    imageUrl: string;
    categoryName: string;
    chefName: string;
    chefPictureUrl: string;

}

export interface PostRecipeDTO {
  recipeName: string;
  description: string;
  preparationTime: number | null;
  cookingTime: number | null;
  difficultyLevel: DifficultyLevel;
  rating: number;
  imageUrl: string;
  plateImageUrl: string;
  categoryId: string;
  chefId: string;
  ni: NutritionInformation;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface ChefRecipe{
    recipeId: string;
    recipeName: string;
    preparationTime: number;
    rating: number;
    imageUrl: string
}

interface ChefForRecipe{
    chefId: string;
    firstName:string;
    lastName:string;
    image_url:string;
    location:string;
    phone_number:string;
    bio:string;
    years_experience:number;
}
