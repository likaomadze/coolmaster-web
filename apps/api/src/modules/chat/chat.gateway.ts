import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({ cors: { origin: "*" } })
export class ChatGateway {
  @WebSocketServer()
  server!: Server;

  constructor(private chat: ChatService) {}

  @SubscribeMessage("chat:message")
  async message(client: Socket, payload: { senderId: string; receiverId: string; message: string; attachment?: string }) {
    const saved = await this.chat.create(payload);
    this.server.to(payload.receiverId).emit("chat:message", saved);
    client.emit("chat:sent", saved);
  }

  @SubscribeMessage("chat:typing")
  typing(client: Socket, payload: { room: string; userId: string }) {
    client.to(payload.room).emit("chat:typing", payload);
  }

  @SubscribeMessage("presence:join")
  join(client: Socket, payload: { userId: string }) {
    client.join(payload.userId);
    this.server.emit("presence:online", payload);
  }
}
