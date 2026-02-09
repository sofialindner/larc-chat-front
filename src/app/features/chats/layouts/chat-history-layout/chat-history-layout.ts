import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore, DisplayUser } from 'core/auth';
import { CommonModule } from '@angular/common';
import { UserMedia } from '../../components';
import { ChatsFacade, UsersStore } from '../../state';

@Component({
  selector: 'app-chat-history-layout',
  imports: [CommonModule, RouterModule, MatIconModule, UserMedia],
  templateUrl: './chat-history-layout.html',
  styleUrl: './chat-history-layout.scss',
  providers: [ChatsFacade],
})
export class ChatHistoryLayout {
  readonly currentUser = computed(() => this.authStore.user());
  readonly users = computed(() =>
    this.usersStore.users().filter((u) => u.id !== this.authStore.user()?.id),
  );

  constructor(
    private usersStore: UsersStore,
    private authStore: AuthStore,
    private facade: ChatsFacade,
  ) {}

  isActiveUser = (userId: number) => userId === this.facade.activeUserId();

  isOffline = (user: DisplayUser) => this.usersStore.isOffline(user);

  isBroadcast = (user: DisplayUser) => this.usersStore.isBroadcast(user);
}
