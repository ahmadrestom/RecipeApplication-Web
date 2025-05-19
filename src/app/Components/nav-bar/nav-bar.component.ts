import { Component } from '@angular/core';
import { ProfileModalComponent } from '../../Shared/profile-modal/profile-modal.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [ProfileModalComponent, NgIf, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  showProfile = false;
}