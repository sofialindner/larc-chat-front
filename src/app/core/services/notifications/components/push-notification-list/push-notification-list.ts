import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PushNotificationService } from '../../push-notification.service';
import { PushNotification } from "../push-notification/push-notification";

@Component({
  selector: 'app-push-notification-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PushNotification],
  templateUrl: './push-notification-list.html',
  styleUrl: './push-notification-list.scss',
})
export class PushNotificationList {
  readonly notifications = computed(() => this.service.notifications())
  
  constructor(private service: PushNotificationService) {}
  
  remove(id: string) {
    this.service.remove(id);
  }
}
