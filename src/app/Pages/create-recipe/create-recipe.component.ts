import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { ButtonComponent } from "../../Components/button/button.component";
import { FooterComponent } from '../../Components/footer/footer.component';
import { CreateRecipeFormComponent } from '../../Components/Create-Recipe/create-recipe-form/create-recipe-form.component';

@Component({
  selector: 'app-create-recipe',
  imports: [HeaderComponent, ButtonComponent,FooterComponent,CreateRecipeFormComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

}
