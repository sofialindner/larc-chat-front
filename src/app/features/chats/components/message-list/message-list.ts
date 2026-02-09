import { CommonModule } from '@angular/common';
import { Component, computed, effect, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../../models';
import { ChatsFacade, UsersStore } from '../../state';
import { map } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthStore, DisplayUser } from 'core/auth';
import { UserMedia } from '../user-media/user-media';
import { BROADCAST_ID } from 'features/chats/constants';

interface HeaderValue {
  icon: string;
  label: string;
  offline: boolean | null;
}

@Component({
  selector: 'app-message-list',
  imports: [MatIconModule, CommonModule, FormsModule, ReactiveFormsModule, UserMedia],
  templateUrl: './message-list.html',
  styleUrl: './message-list.scss',
})
export class MessageList {
  @ViewChild('messageList') messageList?: ElementRef<HTMLDivElement>;

  messageControl = new FormControl<string>('');

  readonly messages = computed(() => this.facade.activeChatMessages());
  readonly isBroadcastChat = computed(() => this.facade.activeUserId() === BROADCAST_ID);
  readonly header = computed(() => {
    const activeId = this.facade.activeUserId();
    if (activeId === null) return;

    const user = this.usersStore.getUser(activeId);
    return {
      label: user?.username || 'Usuário não encontrado',
      icon: user ? 'person' : 'questionmark',
      offline: user ? this.usersStore.isOffline(user) : null,
    } as HeaderValue;
  });

  constructor(
    private route: ActivatedRoute,
    public facade: ChatsFacade,
    private usersStore: UsersStore,
    private authStore: AuthStore,
  ) {
    effect(() => {
      const _ = this.facade.activeUserId();
      this.scrollToBottom();
    });

    effect(() => {
      const inputContent = this.facade.inputContent();
      this.messageControl.setValue(inputContent, { emitEvent: false });
    });

    this.messageControl.valueChanges.subscribe((value) => this.facade.setInputContent(value || ''));
  }

  ngOnInit() {
    this.route.paramMap.pipe(map((params) => params.get('userId'))).subscribe((userId) => 
      this.facade.setActiveUser(Number(userId))
    );
  }

  sentByMe = (message: Message) => message.senderId === this.authStore.user()?.id;

  getUsername = (userId: number) => this.usersStore.getUser(userId)?.username;

  onSendMessage = () => {
    this.facade.sendMessage();
    this.scrollToBottom();
  };

  private scrollToBottom() {
    setTimeout(() => {
      const el = this.messageList?.nativeElement;
      if (!el) return;

      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  }
}
