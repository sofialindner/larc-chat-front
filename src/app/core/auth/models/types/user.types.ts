import { UserDto } from "../dto/user.dto";

export type PlayerStatus = 'idle' | 'playing' | 'getting' | 'waiting';

export type UserLogin = Pick<UserDto, 'id'> & { password: string };

export type DisplayUser = UserDto & { lastTimeOnline: Date }

export type UserPlayer = UserDto & { status: PlayerStatus }; 