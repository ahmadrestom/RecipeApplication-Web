import { Component, OnInit } from '@angular/core';
import { Blog } from '../../Models/blog';
import { BlogService } from '../../Services/blog.service';
import { BlogCardComponent } from '../../Components/blog-card/blog-card.component';
import { NgFor } from '@angular/common';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';

@Component({
  selector: 'app-blogs',
  imports: [BlogCardComponent, NgFor,HeaderComponent,FooterComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit{
  blogs: Blog[] = [];
  currentPage = 1;
  blogPerPage = 9; 
  constructor(private blogService: BlogService){};

  ngOnInit(): void {
    this.loadBlogs();
      
  }

  loadBlogs():void{
    this.blogService.getLatestBlogs(this.blogPerPage, this.currentPage).subscribe({
      next: (data)=>{
        this.blogs = data;
      },
      error: (err)=>{
        console.log("Error fetching blogs in Blog page: ",err);
      }
    })
  }

  goToPage(page:number):void{
    this.currentPage = page;
    this.loadBlogs();
  }




}
