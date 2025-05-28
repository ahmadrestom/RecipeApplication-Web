import { Component } from '@angular/core';
import { ProfileModalComponent } from '../../Shared/profile-modal/profile-modal.component';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [ProfileModalComponent, NgIf, RouterLink, NgFor],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  showProfile = false;

    navItems = [
      {label: 'Home', link:'/home'},
      {label: 'Notifications', link: '/notification'},
      {label: 'Saved Recipes', link: '/saved-recipes'},
      {label: 'Profile', action: () => this.showProfile = true}
    ];

    constructor(private router: Router) {}

  isActive(link: string | undefined): boolean {
    return link ? this.router.isActive(link, true) : false;
  }

  
}