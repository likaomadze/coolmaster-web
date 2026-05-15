import { BookingStatus } from "@prisma/client";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  serviceId!: string;

  @IsDateString()
  scheduledDate!: string;

  @IsString()
  scheduledTime!: string;

  @IsString()
  address!: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  concreteDrilling?: boolean;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsString()
  technicianId?: string;

  @IsOptional()
  @IsDateString()
  scheduledDate?: string;

  @IsOptional()
  @IsString()
  scheduledTime?: string;

  @IsOptional()
  @IsString()
  internalNotes?: string;
}
