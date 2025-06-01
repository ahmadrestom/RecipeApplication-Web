import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outline-button',
  imports: [],
  templateUrl: './outline-button.component.html',
  styleUrl: './outline-button.component.scss'
})
export class OutlineButtonComponent {

  @Input() text = '';
  @Input() action?: ()=>void;
  @Input() route?: string = '';

  execute(){
    if(this.action){
      this.action()
    }
  }

}
