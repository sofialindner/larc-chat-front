import { Routes } from '@angular/router';
import { AUTH_ROUTES } from 'features/auth';
import { CHAT_ROUTES } from 'features/chats';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  ...AUTH_ROUTES,
  ...CHAT_ROUTES,
  {
    path: '*',
    redirectTo: 'auth/login',
  },
];
