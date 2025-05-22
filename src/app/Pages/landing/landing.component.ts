import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { CategoryCardComponent } from '../../Components/Landing-category-card/category-card.component';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [HeaderComponent,CategoryCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  
}