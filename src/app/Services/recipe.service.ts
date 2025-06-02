import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateUrl } from '../../environments/environment';
import { Recipe } from '../Models/recipe';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recentRecipesUrl = `${privateUrl}/recipe/getRecentRecipes?page=0&size=6`;
  private homeRecipesUrl = `${privateUrl}/recipe/getAllRecipes?page=0&size=3`;
  private allRecipesUrl = `${privateUrl}/recipe/getAllRecipes`;
  private recipeByIdUrl = `${privateUrl}/recipe/getRecipeById`;
  private recipeByCategoryUrl = `${privateUrl}/recipe/getRecipesByCategoryName`;

  private allRecipeSubject = new BehaviorSubject<Recipe[] | null>(null);
  allRecipes$ = this.allRecipeSubject.asObservable();

  private recentRecipesSubject = new BehaviorSubject<Recipe[] | undefined>(undefined);
  recentRecipes$ = this.recentRecipesSubject.asObservable();

  private homeRecipesSubject = new BehaviorSubject<Recipe[] | null>(null);
  homeRecipes$ = this.homeRecipesSubject.asObservable();

  private recipesByCategorySubject = new BehaviorSubject<Recipe[] | null>(null);
  recipesByCategory$ = this.recipesByCategorySubject.asObservable();

  constructor(private http: HttpClient) { }

  getRecipesByCategory(category: String){
    this.recipesByCategorySubject.next(null);
    const url = `${this.recipeByCategoryUrl}/${category}`;
    console.log(url)
    this.http.get<Recipe[]>(url).subscribe({
      next: (data) => this.recipesByCategorySubject.next(data),
      error: (error) => {console.error('No recipes with this category found', error);
      this.recipesByCategorySubject.next([])
      }
    });
  }

  getRecentRecipes() {
    if (!this.recentRecipesSubject.value) {
      this.http.get<Recipe[]>(this.recentRecipesUrl).subscribe({
        next: (recentRecipes) => this.recentRecipesSubject.next(recentRecipes),
        error: (error) => console.error('Error fetching recent recipes:', error)
      });
    }
  }

  getHomeRecipes(){
    this.http.get<Recipe[]>(this.homeRecipesUrl).subscribe({
      next: (recipes) => {this.homeRecipesSubject.next(recipes); console.log(recipes)},
      error: (error) => console.error('Error fetching home recipes:', error)
    });
  }

  getAllRecipes(){
    this.http.get<Recipe[]>(this.allRecipesUrl).subscribe({
      next: (recipes) => this.allRecipeSubject.next(recipes),
      error: (error) => console.error('Error fetching all recipes:', error)      
    });
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeByIdUrl}/${id}`);
  }
}