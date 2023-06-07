import { Socket } from 'socket.io-client'
import { Message } from "./interfaces";

// Dependency injection to stay close to the clean architecture principle
export function sendMessage (socket: Socket, message: Message): void {
  socket.emit("send-message", message)
}