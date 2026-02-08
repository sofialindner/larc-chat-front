import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from 'core/auth';
import { ChatService } from 'features/chats/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('lab5-client-front');

  constructor(
    private authStore: AuthStore,
    private chatService: ChatService,
  ) {
    effect(() => {
      const user = this.authStore.user();
      if (!user || this.chatService.connectionOpened()) return;
      this.chatService.connect();
    });
  }
}
