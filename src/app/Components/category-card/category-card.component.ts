import { Component, OnInit ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card',
  imports: [CommonModule],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryCardComponent implements OnInit{
  
  categories: Category[] = [];
  constructor(private categoryService: CategoryService){}

  categoryIconMap: { [key: string]: string } = {
    'Burgers': 'assets/icons/Burgers.png',
    'Desserts': 'assets/icons/Desserts.png',
    'Fast Food': 'assets/icons/Fast Food.png',
    'Grilled': 'assets/icons/Grilled.png',
    'Lebanese': 'assets/icons/Lebanese.png',
    'Low Carb': 'assets/icons/Low Carb.png',
    'Pasta': 'assets/icons/Pasta.png',
    'Pizza': 'assets/icons/Pizza.png',
    'Salad': 'assets/icons/Salad.png',
    'Sandwich': 'assets/icons/Sandwich.png',
    'Seafood': 'assets/icons/Seafood.png',
    'Soups': 'assets/icons/Soups.png',
    'Street Food': 'assets/icons/Street Food.png'
  };

  ngOnInit():void{
    this.getCategories();
  }
  getCategories():void{
    this.categoryService.getAllCategories().subscribe(
      (data: Category[])=>{
        this.categories = data;
      },
      (error)=>{
        console.error("Error fetching categories", error);
      }
    );
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    const opacity = 0.2
    return `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`;
  }
  

}
