import { Component, Input, OnInit } from '@angular/core';
import { NutritionInformation } from '../../../Models/NutritionInformation';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../Pipes/capitalize.pipe';

@Component({
  selector: 'app-ni',
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './ni.component.html',
  styleUrl: './ni.component.scss'
})
export class NiComponent implements OnInit {

  @Input() ni!: NutritionInformation;

  map = new Map<string, string>();

  ngOnInit(): void {
    this.map.set('calories', 'kcal');
    this.map.set('total_fat', 'g');
    this.map.set('cholesterol', 'mg');
    this.map.set('carbohydrates', 'g');
    this.map.set('protein', 'g');
    this.map.set('sugar', 'g');
    this.map.set('sodium', 'mg');
    this.map.set('fiber', 'g');
    this.map.set('zinc', 'mg');
    this.map.set('magnesium', 'mg');
    this.map.set('potassium', 'mg');
  }


}
