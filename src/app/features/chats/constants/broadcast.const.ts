import { DisplayUser } from "core/auth";

export const BROADCAST_ID = 0;

export const BROADCAST_USER: DisplayUser = {
  id: BROADCAST_ID,
  username: 'Todos',
  wins: 0,
  lastTimeOnline: new Date()
}