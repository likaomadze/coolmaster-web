import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  create(payload: { senderId: string; receiverId: string; message: string; attachment?: string }) {
    return this.prisma.message.create({ data: payload });
  }
}
