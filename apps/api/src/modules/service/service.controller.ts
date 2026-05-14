import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PrismaService } from "../prisma/prisma.service";

type CreateServiceBody = {
  slug: string;
  name: string;
  nameKa?: string;
  description: string;
  descriptionKa?: string;
  price: number;
  estimatedDuration: number;
  image?: string;
};

@ApiTags("services")
@Controller("services")
export class ServiceController {
  constructor(private prisma: PrismaService) {}

  @Get()
  findActive() {
    return this.prisma.service.findMany({ where: { active: true }, orderBy: { name: "asc" } });
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() body: CreateServiceBody) {
    return this.prisma.service.create({ data: body });
  }
}
