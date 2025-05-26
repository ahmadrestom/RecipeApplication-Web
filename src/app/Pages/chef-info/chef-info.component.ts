import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChefService } from '../../Services/chef.service';
import { Chef } from '../../Models/chef';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { ChefRecipe } from '../../Models/recipe';
import { RecipeCardComponent } from "../../Components/recipe-card/recipe-card.component";
import { NgFor } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { FollowService } from '../../Services/follow.service';

@Component({
  selector: 'app-chef-info',
  imports: [FooterComponent, RecipeCardComponent, NgFor, RouterLink],
  templateUrl: './chef-info.component.html',
  styleUrl: './chef-info.component.scss',
  animations: [
    trigger('recipeAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChefInfoComponent implements OnInit {

  chefData!: Chef;
  chefRecipes!: ChefRecipe[];
  private chefId!: string;
  stats = [
    { value: 0, label: 'Recipes' },
    { value: 0, label: 'Experience' },
    { value: 0, label: 'Followings' },
    { value: 0, label: 'Followers' }
  ];

  constructor(private route: ActivatedRoute, private chefService: ChefService, private followService: FollowService) { }

  ngOnInit(): void {
     window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("Reading the chef id now --->>>");
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if(id){
        this.chefId = id;
        this.fetchChefData();
        this.fetchChefRecipes();
        this.fetchChefFollowStats(id);        
      }
    });
  }

  fetchChefData(){
    this.chefService.fetchChefData(this.chefId).subscribe({
      next: (data) => {
        console.log("Chef data: ",data);
        this.chefData = data;
        this.stats[1].value = data.years_experience
      },
      error: (err) => console.error("Error fetching chef data ", err)
    })    
  }

  fetchChefRecipes(){
    this.chefService.fetchChefRecipes(this.chefId).subscribe({
      next: (data) => {
        console.log("Chef Recipes: ",data);
        this.chefRecipes = data;
        this.stats[0].value = data.length     
      },
      error: (err) => {
        console.error("Error fetching chef's recipes");
      }
    })
  }

  fetchChefFollowStats(ChefId: string){
    this.followService.fetchFollowStats(ChefId).subscribe({
      next: (data) => {
        this.stats[3].value = data.followerCount;
        this.stats[2].value = data.followingCount;
      },
      error: (erro) => console.error("Error fetching follow stats for chef ",erro)
    });
  }

}
