import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-buttons',
  imports: [],
  templateUrl: './landing-page-buttons.component.html',
  styleUrl: './landing-page-buttons.component.scss'
})
export class LandingPageButtonsComponent {
  constructor( private router: Router){}

  goToAuth(mode: 'login' | 'signup') {
    this.router.navigate(['/auth'], { queryParams: { mode }});
  }

}
