import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateUrl} from '../../environments/environment';
import { Recipe } from '../Models/recipe';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recentRecipesUrl = `${privateUrl}/recipe/getRecentRecipes`;
  private recipesUrl = `${privateUrl}/recipe/getAllRecipes`;
  private recipeById = `${privateUrl}/recipe/getRecipeById`;

  private recipeSubject = new BehaviorSubject<Recipe[] | null>(null);
  private recentRecipesSubject = new BehaviorSubject<Recipe[]|null>(null);
  recipes$ = this.recipeSubject.asObservable();
  recentRecipes$ = this.recentRecipesSubject.asObservable();

  constructor(private http: HttpClient){}

  getRecentRecipes(){
    this.http.get<Recipe[]>(this.recentRecipesUrl).subscribe({
      next: (recentRecipes) => this.recentRecipesSubject.next(recentRecipes),
      error: (error) => console.error('Error fetching recent recipes:', error)
    });     
  }

  getRecipes(){
    this.http.get<Recipe[]>(this.recipesUrl).subscribe({
      next: (recipes) => this.recipeSubject.next(recipes),
      error: (error) => console.error('Error fetching recipes:', error)
    });    
  }

  getRecipeById(id:string):Observable<Recipe>{
    return this.http.get<Recipe>(`${this.recipeById}/${id}`);
  }
}