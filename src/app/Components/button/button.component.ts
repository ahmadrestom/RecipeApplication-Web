import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [],
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() text:string = '';
  @Input() route: string = '';
  @Input() fragment?: string = '';

  constructor(private router: Router){}

  navigate(){
    if(this.route){
      this.router.navigate([this.route], {fragment: this.fragment});
    }
  }

}
