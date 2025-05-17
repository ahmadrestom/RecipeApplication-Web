import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../Models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  imports: [],
  templateUrl: './home-categories.component.html',
  styleUrl: './home-categories.component.scss'
})
export class HomeCategoriesComponent{

  @Input() category: Category|null = null;
  @Input() imageUrl: string = '';

  constructor(private route: Router){}

  onClick(){
    this.route.navigate(['/view-recipes/',this.category?.categoryName])
  }



}
