import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { RatingCardComponent } from '../../Components/rating-card/rating-card.component';
import { ButtonComponent } from '../../Components/button/button.component';
import { Blog } from '../../Models/blog';
import { BlogService } from '../../Services/blog.service';
import { BlogCardComponent } from '../../Components/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';
import { RecipeContainerComponent } from '../../Components/recipe-container/recipe-container.component';
import { NewSettlerComponent } from '../../Components/new-settler/new-settler.component';
import { Category } from '../../Models/category';
import { CategoryService } from '../../Services/category.service';
import { HomeCategoriesComponent } from "../../Components/Home-category-card/home-categories.component";
import { PexelsService } from '../../Services/PexelsService/pexels.service';
import { PexelsResponse } from '../../Models/PexelsResponse';
import { BrandsComponent } from '../../Components/brands/brands.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    RatingCardComponent,
    ButtonComponent,
    BlogCardComponent,
    CommonModule,
    RecipeContainerComponent,
    NewSettlerComponent,
    HomeCategoriesComponent,
    BrandsComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  visibleBlogs: Blog[] = [];
  blogsToShow = 2;
  increment = 2;

  categories: Category[] = [];
  visibileCategories: Category[] = [];
  categoriesToShow = 4;

  categoryImages: {[key:string]: string} = {};

  brands: string[] = [
    'assets/Brands/amazon.svg',
    'assets/Brands/apple.svg',
    'assets/Brands/carrefour.svg',
    'assets/Brands/cocacola.svg',
    'assets/Brands/google.svg',
    'assets/Brands/walmart.svg'
  ];
  

  constructor(
    private blogService: BlogService, 
    private categoryService:CategoryService,
    private pexelsService: PexelsService,
    private router: Router
  ) {};

  ngOnInit() {
    this.getBlogs();
    this.getCategories();
  }

  getCategories(): void{
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.visibileCategories = this.categories.slice(0, this.categoriesToShow);
        this.getImages();
      },
      error: (error) => {
        console.error('Error fetching categories: ', error);
      }
    });    
  }

  viewMoreCategories():void{
    this.categoriesToShow+=this.increment;
    this.visibileCategories = this.categories.slice(0, this.categoriesToShow);
  }

  getImages():void{
    this.categories.forEach(category => {
      this.pexelsService.searchImages(category.category_name,1).subscribe((data: PexelsResponse)=>{
        console.log(`Image for ${category.category_name}: xx`);
        this.categoryImages[category.category_name] = data.photos[0]?.src.medium;
      });
    }); 
  }

  getBlogs(): void {
    this.blogService.getLatestBlogs(2).subscribe(
      (blogs) => {
        this.visibleBlogs = blogs;
      },
      (error) => {
        console.error('Error, cannot fetch blogs', error);
      }
    )
  }
  viewMore(): void {
    this.router.navigate(['/blogs']);    
  }
}
