import { Component, EventEmitter, Input, Output } from '@angular/core';
import { getNotification } from '../../Models/notification';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-notification-card',
  imports: [NgIf],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {

  @Input() notification!: getNotification;
  @Output() delete = new EventEmitter<string>();

  constructor(){}

  onDelete(){
    this.delete.emit(this.notification.notificationId);
  }

}
