import { Component } from '@angular/core';
import { RecipeImagePickerComponent } from '../recipe-image-picker/recipe-image-picker.component';

@Component({
  selector: 'app-create-recipe-form',
  imports: [RecipeImagePickerComponent],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss'
})
export class CreateRecipeFormComponent {

}
