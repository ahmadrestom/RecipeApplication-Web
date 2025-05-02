import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PexelsResponse } from '../../Models/PexelsResponse';

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private API_URL = 'http://localhost:8080/api/pexels';

  constructor(private http: HttpClient) { }
  searchImages(query: string, perPage: number = 1) {
    return this.http.get<PexelsResponse>(`${this.API_URL}?query=${query}&perPage=${perPage}`);
  }
}
