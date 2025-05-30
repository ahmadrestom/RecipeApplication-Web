import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective implements AfterViewInit, OnDestroy{

  private observer: IntersectionObserver;

  constructor(private element: ElementRef){
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          this.animateIn();
          this.observer.unobserve(entry.target);
        }
      });
    },{
      threshold: 0.1 //how much of the element appear while scrolling to animate
    });
  }
  ngAfterViewInit(){
    this.observer.observe(this.element.nativeElement);
  }
  ngOnDestroy(): void {
      this.observer.disconnect();
  }

  private animateIn(){
    const element = this.element.nativeElement;
    const direction = element.getAttribute('data-animation-direction') || 'left';
    element.style.opacity = '1';
    if(direction === 'left'){
      element.style.transform = 'translateX(0)';
    }else{
      element.style.transform = 'translateX(0)';
    }
  }
}
