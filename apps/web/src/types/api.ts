import type { BookingStatus, UserRole } from "@coolmaster/shared";

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  avatar?: string | null;
};

export type ApiService = {
  id: string;
  slug: string;
  name: string;
  nameKa?: string | null;
  description: string;
  descriptionKa?: string | null;
  price: string | number;
  estimatedDuration: number;
  image?: string | null;
  active: boolean;
};

export type ApiBooking = {
  id: string;
  customerId: string;
  technicianId?: string | null;
  serviceId: string;
  status: BookingStatus;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  totalPrice: string | number;
  service?: ApiService;
  customer?: ApiUser;
  technician?: ApiTechnician | null;
};

export type ApiTechnician = {
  id: string;
  rating: number;
  availability: unknown;
  vehicleInfo?: unknown;
  zone?: string | null;
  user: ApiUser;
  bookings?: ApiBooking[];
};

export type AnalyticsOverview = {
  bookings: number;
  revenue: string | number;
  conversionRate: number;
  customerSatisfaction: number;
};

export type ApiNotification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};
