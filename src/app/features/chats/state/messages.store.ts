import { effect, Injectable, signal } from '@angular/core';
import { Message } from '../models';
import { ChatService } from '../services';
import { PushNotificationService } from 'core/services';
import { UsersStore } from './users.store';
import { AuthStore } from 'core/auth';
import { BROADCAST_ID } from '../constants';

@Injectable({ providedIn: 'root' })
export class MessagesStore {
  private readonly _messages = signal<Message[]>([]);

  readonly messages = this._messages.asReadonly();

  constructor(
    private chatService: ChatService,
    private notification: PushNotificationService,
    private usersStore: UsersStore,
    private authStore: AuthStore,
  ) {
    effect(() => {
      const message = this.chatService.lastMessage();
      if (!message || this.shouldNotShow(message)) return;

      const user = this.usersStore.getUser(message.senderId);
      this.notification.show({
        title: user?.username || 'Nova mensagem',
        text: message.content,
        appName: 'Chats',
        routerLink: user ? ['/chats', String(message.senderId)] : undefined,
        icon: 'person',
      });

      this.addMessage(message);
    });
  }

  addMessage(message: Message): void {
    this._messages.update((messages) => [...messages, message]);
  }

  private shouldNotShow(message: Message): boolean {
    return message.senderId === -1 || message.senderId === this.authStore.user()?.id;
  }
}
