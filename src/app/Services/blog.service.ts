import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Blog } from '../Models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  
  constructor(private http: HttpClient) { }

  getLatestBlogs(pageSize: number, page:number): Observable<any> {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

    const url = `https://newsapi.org/v2/everything?q=healthy%20food%20recipe%20nutrition&from=${fromDate}&sortBy=publishedAt&pageSize=${pageSize}&page=${page}&apiKey=${environment.apiKey}`;
    return this.http.get<any>(url).pipe(
      map(response => response.articles.map((article: any) => new Blog(
        article.author,
        article.title,
        article.description,
        article.url,
        article.urlToImage,
        new Date(article.publishedAt),
        article.content
      )))
    );
  }
}
