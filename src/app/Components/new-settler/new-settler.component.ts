import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-settler',
  imports: [ButtonComponent,CommonModule],
  templateUrl: './new-settler.component.html',
  styleUrl: './new-settler.component.scss'
})
export class NewSettlerComponent {

  @Input() varient: 'default' | 'minimal' = 'default';
  @Input() header: string =  '';
  @Input() text: string = '';

}
