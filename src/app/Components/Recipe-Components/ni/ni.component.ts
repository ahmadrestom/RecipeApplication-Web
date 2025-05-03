import { Component, Input } from '@angular/core';
import { NutritionInformation } from '../../../Models/NutritionInformation';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../Pipes/capitalize.pipe';

@Component({
  selector: 'app-ni',
  imports: [CommonModule,CapitalizePipe],
  templateUrl: './ni.component.html',
  styleUrl: './ni.component.scss'
})
export class NiComponent {

  @Input() ni!: NutritionInformation;

}
