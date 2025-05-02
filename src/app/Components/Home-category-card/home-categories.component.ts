import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/category';

@Component({
  selector: 'app-home-categories',
  imports: [],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss'
})
export class HomeCategoriesComponent{

  @Input() category: Category|null = null;
  @Input() imageUrl: string = '';  

}
