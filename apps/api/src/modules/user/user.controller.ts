import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("users")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller("users")
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get("me")
  me(@Req() request: { user: { id: string } }) {
    return this.prisma.user.findUnique({ where: { id: request.user.id }, select: { id: true, name: true, email: true, phone: true, role: true, avatar: true } });
  }

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true } });
  }
}
