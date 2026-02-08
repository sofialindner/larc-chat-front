import { computed, Injectable, signal } from '@angular/core';
import { User } from 'core/auth/models';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _user = signal<User | null>(null);
  private readonly _loggedInAt = signal<Date | null>(null);

  readonly user = this._user.asReadonly();
  readonly loggedInAt = this._loggedInAt.asReadonly();

  readonly isLoggedIn = computed(() => this._user() !== null && this._loggedInAt() !== null);

  setCurrentUser(user: User) {
    this._user.set(user);
    this._loggedInAt.set(new Date());
  }
}
