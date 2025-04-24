import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-food-background',
  imports: [CommonModule],
  templateUrl: './food-background.component.html',
  styleUrl: './food-background.component.scss'
})
export class FoodBackgroundComponent implements OnInit, OnDestroy{
  items: any[] = [];
  private animationFrameId: any = null;
  private icons = ['🍲', 
  '🥘', 
  '🍜', 
  '🍛', 
  '🍝', 
  '🍠', 
  '🥗', 
  '🍣', 
  '🍤', 
  '🍱', 
  '🥮', 
  '🍢', 
  '🧆', 
  '🥫', 
  '🍖', 
  '🍗', 
  '🥩', 
  '🥓', 
  '🍳', 
  '🧈', 
  '🥞', 
  '🧇', 
  '🥖', 
  '🧀', 
  '🍕', 
  '🌮', 
  '🌯', 
  '🥙', 
  '🧆'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initFoodItems();
      this.startAnimation();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initFoodItems() {
    this.items = Array(45).fill(0).map((_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    }));
  }

  private startAnimation() {
    if (!isPlatformBrowser(this.platformId)) return;

    const animate = () => {
      this.items = this.items.map(item => ({
        ...item,
        x: (item.x + 0.2) % (window.innerWidth + 100),
        y: item.y + Math.sin(Date.now()/1000 + item.delay) * 0.5
      }));
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

}
