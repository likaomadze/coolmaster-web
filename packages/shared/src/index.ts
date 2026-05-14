export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "ASSIGNED",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED"
] as const;

export const USER_ROLES = ["CUSTOMER", "TECHNICIAN", "ADMIN", "SUPER_ADMIN"] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type UserRole = (typeof USER_ROLES)[number];

export type Service = {
  id: string;
  name: string;
  nameKa?: string;
  description: string;
  descriptionKa?: string;
  price: number;
  estimatedDuration: number;
  image: string;
};


export type Booking = {
  id: string;
  customerId: string;
  technicianId?: string | null;
  serviceId: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
  totalPrice: number;
};
