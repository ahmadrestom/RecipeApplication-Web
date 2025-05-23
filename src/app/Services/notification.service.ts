import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { privateUrl } from '../../environments/environment';
import { getNotification } from '../Models/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly getNotificationUrl = `${privateUrl}/notification/getAllNotifications`;
  private readonly deleteNotificationUrl = `${privateUrl}/notification/deleteNotification`;


  private notificationsSubject = new BehaviorSubject<getNotification[]>([]);
  notification$ = this.notificationsSubject.asObservable();

  constructor(private http: HttpClient) { }

  fetchNotification() {
    this.http.get<getNotification[]>(this.getNotificationUrl).subscribe({
      next: (data) => {
        this.notificationsSubject.next(data);
      },
      error: (error) => {
        console.error('Error fetching notifications ', error);
      }
    })
  }

  deleteNotification(notificationId: string): void {
    this.http
      .delete(`${this.deleteNotificationUrl}/${notificationId}`, { responseType: 'text' })
      .subscribe({
        next: () => {
          const updated = this.notificationsSubject.value?.filter(
            n => n.notificationId !== notificationId
          );
          this.notificationsSubject.next(updated);
        },
        error: err => console.error('Delete failed', err)
      });
  }
}