import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateUrl } from '../../environments/environment';
import { Chef } from '../Models/chef';
import { ChefRecipe } from '../Models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  private readonly chefDataUrl = `${privateUrl}/user/getChefData`;
  private readonly recipesByChefUrl = `${privateUrl}/recipe/getRecipeByChefId`;

  constructor(private http: HttpClient) { }

  fetchChefData(chefId: string){
    return this.http.get<Chef>(`${this.chefDataUrl}/${chefId}`);
  }

  fetchChefRecipes(chefId: string){
    return this.http.get<ChefRecipe[]>(`${this.recipesByChefUrl}/${chefId}`);
  }
}
