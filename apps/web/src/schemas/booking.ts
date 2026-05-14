import { z } from "zod";

export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  date: z.string().min(1),
  slot: z.string().min(1),
  address: z.string().min(8),
  notes: z.string().max(600).optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;
