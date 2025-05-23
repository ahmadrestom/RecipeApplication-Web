import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { getNotification } from '../../Models/notification';
import { NotificationCardComponent } from "../../Components/notification-card/notification-card.component";
import { CommonModule, NgFor } from '@angular/common';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notifications',
  imports: [NotificationCardComponent, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

   notifications$!: Observable<getNotification[]>;   

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notifications$ = this.notificationService.notification$;
    this.notificationService.fetchNotification();
  }

  deleteNotification(id: string) {
  this.notificationService.deleteNotification(id);
}
trackById(_: number, notif: getNotification) {
  return notif.notificationId;
}
}
