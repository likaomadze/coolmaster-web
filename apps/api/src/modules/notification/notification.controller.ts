import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { NotificationService } from "./notification.service";

@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller("notifications")
export class NotificationController {
  constructor(private notifications: NotificationService) {}

  @Get()
  findAll() {
    return this.notifications.findAll();
  }
}
