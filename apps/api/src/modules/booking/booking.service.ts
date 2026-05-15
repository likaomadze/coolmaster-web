import { ConflictException, Injectable } from "@nestjs/common";
import { BookingStatus } from "@prisma/client";
import Redis from "ioredis";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBookingDto, UpdateBookingDto } from "./dto";

const DEFAULT_SLOTS = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00", "18:00"];
const INSTALLATION_SLUGS = ["installation", "installation-60", "installation-80", "installation-100"];

@Injectable()
export class BookingService {
  private redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379");

  constructor(private prisma: PrismaService) {}

  async availability(date: string, serviceId: string) {
    const scheduledDate = new Date(date);
    const bookings = await this.prisma.booking.findMany({
      where: { scheduledDate, serviceId, status: { not: BookingStatus.CANCELLED } },
      select: { scheduledTime: true }
    });
    const booked = new Set(bookings.map((booking) => booking.scheduledTime));
    const locked = await Promise.all(DEFAULT_SLOTS.map((slot) => this.redis.exists(this.lockKey(date, slot, serviceId))));
    return DEFAULT_SLOTS.map((slot, index) => ({ slot, available: !booked.has(slot) && !locked[index], locked: Boolean(locked[index]) }));
  }

  async lockSlot(input: { date: string; time: string; serviceId: string }) {
    const key = this.lockKey(input.date, input.time, input.serviceId);
    const locked = await this.redis.set(key, "locked", "EX", 600, "NX");
    if (!locked) throw new ConflictException("Slot is already locked");
    return { key, expiresInSeconds: 600 };
  }

  async create(customerId: string, dto: CreateBookingDto) {
    const service = await this.prisma.service.findUniqueOrThrow({ where: { id: dto.serviceId } });
    const drillingPrice = dto.concreteDrilling && INSTALLATION_SLUGS.includes(service.slug) ? 120 : 0;
    return this.prisma.booking.create({
      data: {
        customerId,
        serviceId: dto.serviceId,
        scheduledDate: new Date(dto.scheduledDate),
        scheduledTime: dto.scheduledTime,
        address: dto.address,
        latitude: dto.latitude,
        longitude: dto.longitude,
        notes: dto.notes,
        totalPrice: Number(service.price) + drillingPrice,
        status: BookingStatus.PENDING
      }
    });
  }

  findAll() {
    return this.prisma.booking.findMany({ include: { customer: true, technician: { include: { user: true } }, service: true }, orderBy: { scheduledDate: "asc" } });
  }

  findForCustomer(customerId: string) {
    return this.prisma.booking.findMany({
      where: { customerId },
      include: { technician: { include: { user: true } }, service: true },
      orderBy: { scheduledDate: "asc" }
    });
  }

  async findForTechnicianUser(userId: string) {
    const technician = await this.prisma.technician.findUnique({ where: { userId } });
    if (!technician) return [];
    return this.prisma.booking.findMany({
      where: { technicianId: technician.id },
      include: { customer: true, service: true, technician: { include: { user: true } } },
      orderBy: { scheduledDate: "asc" }
    });
  }

  update(id: string, dto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data: { ...dto, scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined }
    });
  }

  private lockKey(date: string, time: string, serviceId: string) {
    return `slot-lock:${date}:${time}:${serviceId}`;
  }
}
