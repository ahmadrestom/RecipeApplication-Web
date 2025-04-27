import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { RatingCardComponent } from '../../Components/rating-card/rating-card.component';
import { ButtonComponent } from '../../Components/button/button.component';
import { Blog } from '../../Models/blog';
import { BlogService } from '../../Services/blog.service';
import { BlogCardComponent } from '../../Components/blog-card/blog-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RatingCardComponent,ButtonComponent,BlogCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  blogs: Blog[]= [];
  constructor(private blogService: BlogService){};
  ngOnInit(){
    this.getBlogs();
  }
  getBlogs(): void{
    this.blogService.getLatestBlogs().subscribe(
      (blogs) => {
        this.blogs = blogs;
      },
      (error) => {
        console.error('Error, cannot fetch blogs', error);
      }
    )
  }

}
