import { Routes } from '@angular/router';
import { MessageList } from './components';
import { authGuard } from 'core/guards/auth.guard';
import { ChatHistoryLayout } from './layouts/chat-history-layout/chat-history-layout';

export const CHAT_ROUTES: Routes = [
  {
    path: 'chats',
    canActivate: [authGuard],
    component: ChatHistoryLayout,
    children: [
      {
        path: '*',
        redirectTo: 'chats',
        pathMatch: 'full',
      },
      {
        path: ':userId',
        component: MessageList,
      },
    ],
  },
];
