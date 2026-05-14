import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("technicians")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.TECHNICIAN)
@Controller("technicians")
export class TechnicianController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.prisma.technician.findMany({ include: { user: true, bookings: true } });
  }

  @Get("me")
  @Roles(Role.TECHNICIAN, Role.ADMIN, Role.SUPER_ADMIN)
  me(@Req() request: { user: { id: string } }) {
    return this.prisma.technician.findUnique({ where: { userId: request.user.id }, include: { user: true, bookings: true } });
  }
}
