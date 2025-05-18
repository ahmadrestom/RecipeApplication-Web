import { Component } from '@angular/core';
import { ProfileModalComponent } from '../../Shared/profile-modal/profile-modal.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [ProfileModalComponent, NgIf],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  showProfile = false;

}
