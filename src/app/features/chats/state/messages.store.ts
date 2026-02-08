import { effect, Injectable, signal } from '@angular/core';
import { Message } from '../models';
import { ChatService } from '../services';

@Injectable({ providedIn: 'root' })
export class MessagesStore {
  private readonly _messages = signal<Message[]>([]);

  readonly messages = this._messages.asReadonly();

  constructor(private chatService: ChatService) {
    effect(() => {
      const lastMessage = this.chatService.lastMessage();
      if (!lastMessage || lastMessage.senderId === -1) return;
      this.addMessage(lastMessage);
    });
  }

  addMessage(message: Message): void {
    this._messages.update((messages) => [...messages, message]);
  }
}
