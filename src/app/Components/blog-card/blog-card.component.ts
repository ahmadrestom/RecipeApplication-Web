import { Component, Input } from '@angular/core';
import { Blog } from '../../Models/blog';
import { ScrollAnimationDirective } from '../../Directive/scroll-animation.directive';

@Component({
  selector: 'app-blog-card',
  imports: [ScrollAnimationDirective],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {

  @Input() blog: Blog | null = null;
   

  goToUrl():void{
    window.open(this.blog?.url, '_blank');
  }

  get formattedDate():string{
    if(!this.blog?.publishedAt) return ``;
    return this.formatDate(this.blog.publishedAt);
  }

  formatDate(date?:Date):string{
    if(!date) return ``;
    const d = new Date(date);
    const day = d.getUTCDate();
    const month = d.getUTCMonth()+1;
    const year = d.getUTCFullYear();
    const hours = d.getUTCHours();
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}(GMT)`;
  }
}
