import { MessageDto } from "../dto/message.dto";

export type MessageCreate = Pick<MessageDto, 'receiverId' | 'content'>;