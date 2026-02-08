import { effect, Injectable, signal, untracked } from '@angular/core';
import { DisplayUser } from 'core/auth/models';
import { ChatService } from '../services';

@Injectable({ providedIn: 'root' })
export class UsersStore {
  private readonly _users = signal<DisplayUser[]>([]);
  private readonly _lastReceivedAt = signal<Date | null>(null);

  readonly users = this._users.asReadonly();
  readonly lastReceivedAt = this._lastReceivedAt.asReadonly();

  constructor(private chatService: ChatService) {
    effect(() => {
      const onlineUsers = this.chatService.onlineUsers();
      if (!onlineUsers.length) return;

      const now = new Date();
      const currentUsers = untracked(() => this._users());

      const userMap = new Map<number, DisplayUser>(currentUsers.map((u) => [u.id, u]));

      for (const user of onlineUsers) {
        const existing = userMap.get(user.id);

        if (existing) {
          userMap.set(user.id, {
            ...existing,
            ...user,
            lastTimeOnline: now,
          });
        } else {
          userMap.set(user.id, {
            ...user,
            lastTimeOnline: now,
          });
        }
      }

      this._lastReceivedAt.set(now);
      this._users.set(Array.from(userMap.values()));
    });
  }

  getUser(userId: number): DisplayUser | null {
    return this._users().find((u) => u.id === userId) || null;
  }

  isOffline(user: DisplayUser) {
    if (!this._lastReceivedAt()) return false;
    return user.lastTimeOnline.getTime() < this._lastReceivedAt()!.getTime();
  }
}
