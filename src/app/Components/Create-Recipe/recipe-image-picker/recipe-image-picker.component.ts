import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'recipe-image-picker',
  imports: [NgIf],
  templateUrl: './recipe-image-picker.component.html',
  styleUrl: './recipe-image-picker.component.scss'
})
export class RecipeImagePickerComponent {
   imagePreview: string | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imagePreview = (e.target as FileReader).result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  deleteImage(event: Event): void {
  event.stopPropagation();
  this.imagePreview = null;
}

}
