import { Component, Input } from '@angular/core';
import { Instruction } from '../../../Models/Instruction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions',
  imports: [CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent {

  @Input() instructions!: Instruction[];

  
}
