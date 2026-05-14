import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.notification.findMany({ orderBy: { createdAt: "desc" } });
  }

  queue(trigger: string, userId: string, title: string, body: string) {
    return this.prisma.notification.create({ data: { type: trigger, userId, title, body } });
  }
}
