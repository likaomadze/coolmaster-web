"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { AnalyticsOverview, ApiBooking, ApiNotification, ApiService, ApiTechnician } from "@/types/api";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data } = await api.get<ApiService[]>("/services");
      return data;
    }
  });
}

export function useBookings(enabled = true) {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data } = await api.get<ApiBooking[]>("/bookings");
      return data;
    },
    enabled
  });
}

export function useMyBookings(enabled = true) {
  return useQuery({
    queryKey: ["bookings", "my"],
    queryFn: async () => {
      const { data } = await api.get<ApiBooking[]>("/bookings/my");
      return data;
    },
    enabled
  });
}

export function useTechnicians(enabled = true) {
  return useQuery({
    queryKey: ["technicians"],
    queryFn: async () => {
      const { data } = await api.get<ApiTechnician[]>("/technicians");
      return data;
    },
    enabled
  });
}

export function useTechnicianMe(enabled = true) {
  return useQuery({
    queryKey: ["technicians", "me"],
    queryFn: async () => {
      const { data } = await api.get<ApiTechnician | null>("/technicians/me");
      return data;
    },
    enabled
  });
}

export function useTechnicianBookings(enabled = true) {
  return useQuery({
    queryKey: ["bookings", "technician", "my"],
    queryFn: async () => {
      const { data } = await api.get<ApiBooking[]>("/bookings/technician/my");
      return data;
    },
    enabled
  });
}

export function useAnalytics(enabled = true) {
  return useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: async () => {
      const { data } = await api.get<AnalyticsOverview>("/analytics/overview");
      return data;
    },
    enabled
  });
}

export function useNotifications(enabled = true) {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get<ApiNotification[]>("/notifications");
      return data;
    },
    enabled
  });
}

export function useAvailability(date?: string, serviceId?: string) {
  return useQuery({
    queryKey: ["availability", date, serviceId],
    queryFn: async () => {
      const { data } = await api.get<Array<{ slot: string; available: boolean; locked: boolean }>>("/bookings/availability", {
        params: { date, serviceId }
      });
      return data;
    },
    enabled: Boolean(date && serviceId)
  });
}
