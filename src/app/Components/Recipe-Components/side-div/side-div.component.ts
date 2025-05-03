import { Component, Input } from '@angular/core';
import { Recipe } from '../../../Models/recipe';
import { NiComponent } from '../ni/ni.component';

@Component({
  selector: 'app-side-div',
  imports: [NiComponent],
  templateUrl: './side-div.component.html',
  styleUrl: './side-div.component.scss'
})
export class SideDivComponent {

  @Input() recipe!:Recipe;

}
