import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { CategoryCardComponent } from '../../Components/category-card/category-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent,CategoryCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  
}