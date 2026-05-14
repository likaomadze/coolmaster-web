"use client";

import { money } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import { useBookings, useMyBookings } from "@/hooks/use-platform-data";

export function BookingTable({ scope = "admin" }: { scope?: "admin" | "customer" }) {
  const { locale, t } = useI18n();
  const adminQuery = useBookings(scope === "admin");
  const customerQuery = useMyBookings(scope === "customer");
  const bookings = scope === "admin" ? adminQuery.data ?? [] : customerQuery.data ?? [];
  const isLoading = scope === "admin" ? adminQuery.isLoading : customerQuery.isLoading;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
          <tr>
            <th className="p-4">{t("table.booking")}</th>
            <th className="p-4">{t("table.service")}</th>
            <th className="p-4">{t("table.schedule")}</th>
            <th className="p-4">{t("table.status")}</th>
            <th className="p-4">{t("table.total")}</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="p-4 text-slate-500" colSpan={5}>Loading bookings...</td>
            </tr>
          )}
          {!isLoading && bookings.length === 0 && (
            <tr>
              <td className="p-4 text-slate-500" colSpan={5}>No bookings yet.</td>
            </tr>
          )}
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-t border-slate-100 dark:border-slate-800">
              <td className="p-4 font-bold">{booking.id}</td>
              <td className="p-4">{booking.service ? serviceText(booking.service, locale).name : booking.serviceId}</td>
              <td className="p-4 text-slate-500">{booking.scheduledDate} · {booking.scheduledTime}</td>
              <td className="p-4"><StatusBadge status={booking.status} /></td>
              <td className="p-4 font-bold">{money(Number(booking.totalPrice))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
