import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Blog } from '../Models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = `https://newsapi.org/v2/everything?q=healthy%20food%20recipe%20nutrition&from=2025-04-10&sortBy=publishedAt&apiKey=${environment.apiKey}`;

  constructor(private http: HttpClient) { }

  getLatestBlogs(pageSize: number, page:number): Observable<any> {
    const url = `${this.apiUrl}&pageSize=${pageSize}&page=${page}`;
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
