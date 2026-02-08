import { computed, Injectable, signal } from '@angular/core';
import { MessagesStore } from './messages.store';
import { AuthStore } from 'core/auth';
import { ChatService } from '../services';
import { Message, MessageCreate } from '../models';

@Injectable()
export class ChatsFacade {
  private _activeUserId = signal<number | null>(null);
  private _inputContent = signal<string>('');

  readonly activeUserId = this._activeUserId.asReadonly();
  readonly inputContent = this._inputContent.asReadonly();

  readonly isBroadcast = computed(() => this._activeUserId() === 0);

  readonly messageDraft = computed(
    () =>
      ({
        receiverId: this._activeUserId() || 0,
        content: this._inputContent() || '',
      }) as MessageCreate,
  );
  readonly activeChatMessages = computed(() => {
    const activeId = this._activeUserId();
    if (!activeId) return [];
    return this.messagesStore
      .messages()
      .filter((m) => m.senderId === activeId || m.receiverId === activeId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  });

  constructor(
    private authStore: AuthStore,
    private messagesStore: MessagesStore,
    private chatService: ChatService,
  ) {}

  sendMessage() {
    if (!this._activeUserId() || !this._inputContent()) return;

    const messageDraft: MessageCreate = { ...this.messageDraft() };
    this._inputContent.set('');

    this.chatService.sendMessage(messageDraft).subscribe({
      next: (message: Message) => {
        this.messagesStore.addMessage(message);
      },
      error: (err) => console.error(err)
    });
  }

  setActiveUser(userId: number) {
    this._activeUserId.set(userId);
  }

  setInputContent(content: string) {
    this._inputContent.set(content);
  }
}
