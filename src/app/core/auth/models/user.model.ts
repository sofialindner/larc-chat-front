import { UserDto } from "./dto/user.dto";

export class User {
  readonly id: number;
  readonly username: string;
  readonly wins: number;

  constructor(data: UserDto) {
    this.id = data.id;
    this.username = data.username;
    this.wins = data.wins;
  }
}