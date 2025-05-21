import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../../Services/CountriesService/country.service';
import { Country } from '../../../Models/country';
import { NgFor } from '@angular/common';
import { AuthServiceService } from '../../../Services/auth.service';
import { UpgradeToChef } from '../../../Models/chef';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../../button/button.component";
import {  Router } from '@angular/router';

@Component({
  selector: 'app-upgrade-to-chef',
  imports: [NgFor, FormsModule, ButtonComponent],
  templateUrl: './upgrade-to-chef.component.html',
  styleUrl: './upgrade-to-chef.component.scss'
})
export class UpgradeToChefComponent implements OnInit{

  countries: Country[] | null = [];
  name: string = '';
  email: string = '';

  chefUpgradeModel: UpgradeToChef = {
    userId: '',
    location: '',
    bio: '',
    years_experience: null,
    phone_number: ''
  };

  phoneCode = '';
  phoneNumber = '';
  city = '';
  country = '';

  

  constructor(private router: Router,private countriesService: CountryService, private authService:AuthServiceService){}

  ngOnInit(): void {
    this.countriesService.fetchCountries().subscribe(data => {
      this.countries = data;
      this.countries.sort((a,b)=>
        a.name.common.localeCompare(b.name.common)
      );
      console.log(this.countries);
    });
    this.authService.user$.subscribe(user => {
      if(user){
        const firstName = user.firstName ?? '';
        const lastName = user.lastName ?? '';
        this.name = `${firstName} ${lastName}`.trim();
        this.email = user.email;
        this.chefUpgradeModel.userId = user.id
      }
    })    
  }

  onSubmit(){
    this.chefUpgradeModel.phone_number = `+${this.phoneCode} ${this.phoneNumber}`;
    this.chefUpgradeModel.location = `${this.city}, ${this.country}`;
    this.authService.upgradeToChef(this.chefUpgradeModel);
    this.router.navigate(['/home']);
    
  }

  submitForm = () => {
    this.onSubmit();
  }
}
