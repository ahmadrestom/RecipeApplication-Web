import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../Models/category';
import { publicUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryUrl = `${publicUrl}/category/getAllCategories`

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.categoryUrl);
  }
}
