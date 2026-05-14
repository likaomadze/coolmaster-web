"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { ApiUser } from "@/types/api";

export function useAuth() {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : null;
  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await api.get<ApiUser | null>("/users/me");
      return data;
    },
    enabled: Boolean(token),
    retry: false
  });

  return {
    user: query.data ?? null,
    isLoading: Boolean(token) && query.isLoading,
    isAdmin: query.data?.role === "ADMIN" || query.data?.role === "SUPER_ADMIN",
    isAuthenticated: Boolean(query.data),
    refetch: query.refetch
  };
}
