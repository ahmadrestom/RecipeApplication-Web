import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CreateRecipeFormComponent } from '../../Components/Create-Recipe/create-recipe-form/create-recipe-form.component';
import { AuthServiceService } from '../../Services/auth.service';
import { User } from '../../Models/user';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UpgradeToChefComponent } from "../../Components/Create-Recipe/upgrade-to-chef/upgrade-to-chef.component";

@Component({
  selector: 'app-create-recipe',
  imports: [HeaderComponent, FooterComponent, CreateRecipeFormComponent, CommonModule, UpgradeToChefComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent{

  user$ :Observable<User|null>;
  constructor(private userService: AuthServiceService){
    this.user$ = this.userService.user$;
  };
}