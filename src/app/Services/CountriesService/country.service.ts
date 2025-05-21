import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Country } from '../../Models/country';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private readonly countriesUrl = 'https://restcountries.com/v3.1/all?fields=name,cca2';

  constructor(private http: HttpClient) { }

  fetchCountries(){
    return this.http.get<Country[]>(this.countriesUrl);   
  }
}
