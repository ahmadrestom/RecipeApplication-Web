import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { LandingPageButtonsComponent } from '../landing-page-buttons/landing-page-buttons.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { AuthServiceService } from '../../Services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBarComponent,LandingPageButtonsComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user$ :Observable<User|null>;
  searchExpanded = false;
  constructor(private router: Router, private authService: AuthServiceService){
    this.user$ = this.authService.user$;
  };

  get isLandingPage(): boolean {
    return this.router.url === '/';
  }
toggleSearch() {
  this.searchExpanded = !this.searchExpanded;
}

collapseSearch() {
  setTimeout(() => this.searchExpanded = false, 200);
}
}
