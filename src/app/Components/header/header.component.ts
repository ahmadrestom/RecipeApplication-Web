import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LandingPageButtonsComponent } from '../landing-page-buttons/landing-page-buttons.component';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent,LandingPageButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  

}
