import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { getNotification } from '../../Models/notification';
import { NotificationCardComponent } from "../../Components/notification-card/notification-card.component";
import { NgFor } from '@angular/common';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";

@Component({
  selector: 'app-notifications',
  imports: [NotificationCardComponent, NgFor, HeaderComponent, FooterComponent],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{

  notificiations: getNotification[] | undefined = [];

  constructor(private notificationService: NotificationService){}

  ngOnInit(): void {
    this.notificationService.fetchNotification();      
    this.notificationService.notification$.subscribe( notifications => {
      console.log(notifications);
      this.notificiations = notifications;
    })
  }

  deleteNotification(notificationId: string){
    this.notificationService.deleteNotification(notificationId).subscribe(() => {
      this.notificationService.fetchNotification();
    })
  }
}
