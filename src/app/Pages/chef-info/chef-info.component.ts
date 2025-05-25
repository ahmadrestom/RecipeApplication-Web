import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChefService } from '../../Services/chef.service';
import { Chef } from '../../Models/chef';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { ChefRecipe } from '../../Models/recipe';
import { RecipeCardComponent } from "../../Components/recipe-card/recipe-card.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chef-info',
  imports: [HeaderComponent, FooterComponent, RecipeCardComponent, NgFor],
  templateUrl: './chef-info.component.html',
  styleUrl: './chef-info.component.scss'
})
export class ChefInfoComponent implements OnInit {

  chefData!: Chef;
  chefRecipes!: ChefRecipe[];
  private chefId!: string;


  constructor(private route: ActivatedRoute, private chefService: ChefService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if(id){
        this.chefId = id;
        this.fetchChefData();
      }
    });
  }

  fetchChefData(){
    this.chefService.fetchChefData(this.chefId).subscribe({
      next: (data) => {
        this.chefData = data;
      },
      error: (err) => console.error("Error fetching chef data ", err)
    })    
  }

  fetchChefRecipes(){
    this.chefService.fetchChefRecipes(this.chefId).subscribe({
      next: (data) => {
        this.chefRecipes = data;        
      },
      error: (err) => {
        console.error("Error fetching chef's recipes");
      }
    })
  }

}
