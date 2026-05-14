import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { PrismaService } from "../prisma/prisma.service";

@ApiTags("analytics")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller("analytics")
export class AnalyticsController {
  constructor(private prisma: PrismaService) {}

  @Get("overview")
  async overview() {
    const [bookings, revenue] = await Promise.all([
      this.prisma.booking.count(),
      this.prisma.invoice.aggregate({ _sum: { amount: true } })
    ]);
    return { bookings, revenue: revenue._sum.amount ?? 0, conversionRate: 0.42, customerSatisfaction: 4.92 };
  }
}
