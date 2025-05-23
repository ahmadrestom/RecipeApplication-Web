import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/notification.service';
import { getNotification } from '../../Models/notification';
import { NotificationCardComponent } from "../../Components/notification-card/notification-card.component";
import { CommonModule, NgFor} from '@angular/common';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-notifications',
  imports: [NotificationCardComponent, HeaderComponent, FooterComponent, CommonModule, NgFor],
  templateUrl: './notifications.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {

  private filterSubject = new BehaviorSubject<'all' | 'read' | 'unread'>('all');
  selectedFilter$ = this.filterSubject.asObservable();

  filteredNotifications$: Observable<getNotification[]> = of([]);

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.fetchNotification();
    this.filteredNotifications$ = combineLatest([
      this.notificationService.notification$,
      this.selectedFilter$
    ]).pipe(
      map(([notifications, filter]) => {
        if (filter === 'all') {
          return notifications;
        } else if (filter === 'read') {
          return notifications.filter(n => n.read === true);
        } else {
          return notifications.filter(n => n.read === false);
        }
      }
      )
    )
  }

  setFilter(filter: 'all' | 'read' | 'unread') {
    this.filterSubject.next(filter);
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id);
  }
  trackById(_: number, notif: getNotification) {
    return notif.notificationId;
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }
}