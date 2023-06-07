import socket from 'domains/Socket/connexion'
import { Message } from "./interfaces";

export function sendMessage (message: Message): void {
  socket.emit("send-message", message)
}