import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserDto, UserLogin } from 'core/auth/models';
import { environment } from 'environments';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(login: UserLogin): Observable<User> {
    return this.http.post<UserDto>(`${this.apiUrl}/login`, login).pipe(map((dto) => new User(dto)));
  }
}
