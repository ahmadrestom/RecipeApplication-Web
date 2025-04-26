import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LandingPageButtonsComponent } from '../landing-page-buttons/landing-page-buttons.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NavBarComponent,LandingPageButtonsComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchExpanded = false;
  constructor(private router: Router){};

  get isLandingPage(): boolean {
    return this.router.url === '/';
  }
toggleSearch() {
  this.searchExpanded = !this.searchExpanded;
}

collapseSearch() {
  // optional: delay a bit so user doesn't lose focus immediately
  setTimeout(() => this.searchExpanded = false, 200);
}
}
