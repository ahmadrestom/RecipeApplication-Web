import { Component } from '@angular/core';
import { NewSettlerComponent } from '../new-settler/new-settler.component';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
