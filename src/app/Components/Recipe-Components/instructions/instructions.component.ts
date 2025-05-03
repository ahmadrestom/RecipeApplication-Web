import { Component, Input } from '@angular/core';
import { Instruction } from '../../../Models/Instruction';

@Component({
  selector: 'app-instructions',
  imports: [],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent {

  @Input() instructions!: Instruction[];

  
}
