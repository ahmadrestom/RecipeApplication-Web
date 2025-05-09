import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page-buttons',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing-page-buttons.component.html',
  styleUrl: './landing-page-buttons.component.scss'
})
export class LandingPageButtonsComponent {
  constructor(){}

}
