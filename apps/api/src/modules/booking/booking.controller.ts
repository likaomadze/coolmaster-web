import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { Roles } from "../../common/decorators/roles.decorator";
import { RolesGuard } from "../../common/guards/roles.guard";
import { BookingService } from "./booking.service";
import { CreateBookingDto, UpdateBookingDto } from "./dto";

@ApiTags("bookings")
@ApiBearerAuth()
@Controller("bookings")
export class BookingController {
  constructor(private readonly bookings: BookingService) {}

  @Get("availability")
  availability(@Query("date") date: string, @Query("serviceId") serviceId: string) {
    return this.bookings.availability(date, serviceId);
  }

  @Post("locks")
  lockSlot(@Body() body: { date: string; time: string; serviceId: string }) {
    return this.bookings.lockSlot(body);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post()
  create(@Req() request: { user: { id: string } }, @Body() dto: CreateBookingDto) {
    return this.bookings.create(request.user.id, dto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("my")
  findMine(@Req() request: { user: { id: string } }) {
    return this.bookings.findForCustomer(request.user.id);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.TECHNICIAN, Role.ADMIN, Role.SUPER_ADMIN)
  @Get("technician/my")
  findTechnicianMine(@Req() request: { user: { id: string } }) {
    return this.bookings.findForTechnicianUser(request.user.id);
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.bookings.findAll();
  }

  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.TECHNICIAN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBookingDto) {
    return this.bookings.update(id, dto);
  }
}
