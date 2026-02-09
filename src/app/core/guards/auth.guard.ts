import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, AuthStore } from 'core/auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const authStore = inject(AuthStore);
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authStore.isLoggedIn()) {
    const user = await firstValueFrom(authService.me())
    authStore.setCurrentUser(user)
  }

  if (authStore.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
