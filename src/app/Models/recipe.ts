import { Category } from "./category";
import { Ingredient } from "./Ingredient";
import { Instruction } from "./Instruction";
import { NutritionInformation } from "./NutritionInformation";
import { Review } from "./review";

export enum DifficultyLevel{
    Easy, Medium, Hard
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
