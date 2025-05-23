import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getNotification } from '../../Models/notification';
import { CommonModule, NgIf } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';
import { TimeAgoPipe } from '../../Pipes/time-ago.pipe';
@Component({
  selector: 'app-notification-card',
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('600ms ease', style({ opacity: 0, transform: 'translateY(300px)' }))
      ])
    ])
  ]
})
export class NotificationCardComponent {

  isRemoving = false;

  @Input() notification!: getNotification;
  @Output() delete = new EventEmitter<string>();
  @Output() markAsRead = new EventEmitter<string>();

  constructor(){}

  onDelete(){
    this.isRemoving = true;
    setTimeout(() => {
      this.delete.emit(this.notification.notificationId);      
    }, 600);
  }

  onMarkAsRead(){
    //this.notification.read = true;
    
    this.markAsRead.emit(this.notification.notificationId);
  }

}
