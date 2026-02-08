import { computed, Injectable, signal } from '@angular/core';
import { Message, MessageCreate, MessageDto } from '../models';
import { User } from 'core/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments';
import { map, Observable } from 'rxjs';

interface WebsocketMessage {
  message: MessageDto;
  users: User[];
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: WebSocket | null = null;

  readonly lastMessage = signal<Message | null>(null);
  readonly onlineUsers = signal<User[]>([]);

  readonly connectionOpened = computed(() => this.socket !== null);

  constructor(private http: HttpClient) {}

  connect() {
    if (this.socket) return;
    this.socket = new WebSocket(`${environment.websocketUrl}/ws`);

    this.socket.onmessage = (ev) => {
      const data: WebsocketMessage = JSON.parse(ev.data);
      this.onlineUsers.set(data.users);
      this.lastMessage.set(new Message(data.message));
    };

    this.socket.onclose = () => {
      setTimeout(() => this.connect(), 1000);
    };
  }

  sendMessage(message: MessageCreate): Observable<Message> {
    return this.http
      .post<MessageDto>(`${environment.apiUrl}/messages`, message)
      .pipe(map((dto) => new Message(dto)));
  }
}
