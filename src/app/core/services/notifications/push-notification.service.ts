import { Injectable, signal } from '@angular/core';
import { PushNotificationData } from './push-notification.model';

@Injectable({ providedIn: 'root' })
export class PushNotificationService {
  private readonly _notifications = signal<PushNotificationData[]>([]);
  readonly notifications = this._notifications.asReadonly();

  constructor() {}

  show(data: Omit<PushNotificationData, 'id'>) {
    const notification: PushNotificationData = {
      id: crypto.randomUUID(),
      duration: 30000,
      ...data,
    };

    this._notifications.update((list) => [...list, notification]);

    const timeout = notification.duration ?? 30000;

    setTimeout(() => {
      this.remove(notification.id);
    }, timeout);
  }

  remove(id: string) {
    this._notifications.update((list) =>
      list.filter((n) => n.id !== id)
    );
  }

  clear() {
    this._notifications.set([]);
  }
}
