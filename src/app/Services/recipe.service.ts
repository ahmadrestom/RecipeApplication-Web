import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateUrl} from '../../environments/environment';
import { Recipe } from '../Models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recentRecipesUrl = `${privateUrl}/recipe//getRecentRecipes`;
  private recipesUrl = `${privateUrl}/recipe//getRecentRecipes/getAllRecipes`;

  constructor(private http: HttpClient){}

  getRecentRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recentRecipesUrl);    
  }

  getRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.recipesUrl);
  }
}