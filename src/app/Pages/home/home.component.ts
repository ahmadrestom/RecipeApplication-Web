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

import { AuthServiceService } from '../../Services/auth.service';
import { Recipe } from '../../Models/recipe';
import { RecipeService } from '../../Services/recipe.service';
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
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  recipes: Recipe[] = [];

  recentRecipes: Recipe[] = [];
  visibleBlogs: Blog[] = [];
  blogsToShow = 2;
  increment = 4;

  categories: Category[] = [];
  visibileCategories: Category[] = [];
  categoriesToShow = 4;
  loadingStates: { [recipeId: string]: boolean } = {};
  categoryImages: { [key: string]: string } = {};

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
    private categoryService: CategoryService,
    private pexelsService: PexelsService,
    private router: Router,
    private authService: AuthServiceService,
    private recipeService: RecipeService

  ) { };


  ngOnInit() {
    console.log('Home ngOnInit')
    this.getBlogs();
    this.getCategories();
    this.recipeService.getHomeRecipes();
    this.recipeService.getRecentRecipes();

    this.recipeService.homeRecipes$.subscribe(HomeRecipes => {
      if (HomeRecipes) {
        this.recipes = HomeRecipes;
        this.preloadImages(this.recipes);
      }
    });

    this.recipeService.recentRecipes$.subscribe(recentRecipes => {
      if (recentRecipes) {
        this.recentRecipes = recentRecipes;
        
        this.preloadImages(this.recentRecipes);
      }
    });
  }

  getCategories(): void {
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
  getImages(): void {
    this.categories.forEach(category => {
      this.pexelsService.searchImages(category.categoryName, 1).subscribe((data: PexelsResponse) => {
        console.log(data);
        this.categoryImages[category.categoryName] = data.photos[0]?.src.medium;
      });
    });
  }

  preloadImages(recipes: Recipe[]): void {
    recipes.forEach(recipe => {
      this.loadingStates[recipe.recipeId] = true;
      this.loadImage(recipe.imageUrl).then(() => {
        this.loadingStates[recipe.recipeId] = false;
      }).catch(() => {
        this.loadingStates[recipe.recipeId] = false;
      });
      if (recipe.plateImageUrl) {
        this.loadImage(recipe.plateImageUrl);
      }
    });
  }

  private loadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  }

  logout(): void {
    this.authService.logout();
  }


  viewMoreCategories(): void {
    this.categoriesToShow += this.increment;
    this.visibileCategories = this.categories.slice(0, this.categoriesToShow);
  }

  getBlogs(): void {
    this.blogService.getLatestBlogs(2, 1).subscribe(
      (blogs) => {
        this.visibleBlogs = blogs;
      },
      (error) => {
        console.error('Error, cannot fetch blogs', error);
      }
    )
  }
  viewMore(): void {
    if (this.router.url === '/blogs') {
      this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
        this.router.navigate(['/blogs']);
      });
    } else {
      this.router.navigate(['/blogs']);
    }
  }
}
