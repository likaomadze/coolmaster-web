"use client";

import { BookingStatus } from "@coolmaster/shared";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";

const tone: Record<BookingStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  CONFIRMED: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-200",
  IN_PROGRESS: "bg-purple-50 text-purple-700 ring-purple-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 ring-red-200"
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const { locale } = useI18n();
  const labels: Record<BookingStatus, string> = locale === "ka" ? {
    PENDING: "მოლოდინში",
    CONFIRMED: "დადასტურებული",
    ASSIGNED: "მინიჭებული",
    IN_PROGRESS: "მიმდინარეობს",
    COMPLETED: "დასრულებული",
    CANCELLED: "გაუქმებული"
  } : {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    ASSIGNED: "ASSIGNED",
    IN_PROGRESS: "IN PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED"
  };
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold ring-1", tone[status])}>{labels[status]}</span>;
}
