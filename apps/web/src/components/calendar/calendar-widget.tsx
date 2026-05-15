import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useI18n } from "@/i18n/i18n";
import { useBookings, useTechnicians } from "@/hooks/use-platform-data";
import type { ApiBooking } from "@/types/api";

function startOfWeek(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  next.setHours(0, 0, 0, 0);
  return next;
}

function dateKey(date: Date | string) {
  const next = new Date(date);
  return next.toISOString().slice(0, 10);
}

function bookingsForCell(bookings: ApiBooking[], technicianId: string | null, day: Date) {
  const key = dateKey(day);
  return bookings.filter((booking) => (booking.technicianId ?? null) === technicianId && dateKey(booking.scheduledDate) === key);
}

export function CalendarWidget() {
  const { locale, t } = useI18n();
  const { data: bookings = [] } = useBookings();
  const { data: technicians = [] } = useTechnicians();
  const weekStart = startOfWeek(new Date());
  const weekDays = Array.from({ length: 5 }, (_, index) => {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + index);
    return day;
  });
  const dayFormatter = new Intl.DateTimeFormat(locale === "ka" ? "ka-GE" : "en-US", { weekday: "short", day: "numeric", month: "short" });
  const rows = [
    ...technicians.map((tech) => ({ id: tech.id, name: tech.user.name })),
    { id: null, name: t("calendar.unassigned") }
  ];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{t("calendar.dispatch")}</p>
          <h3 className="text-xl font-black">{t("calendar.week")}</h3>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="rounded-full bg-emerald/10 px-3 py-1 text-emerald">{t("calendar.available")}</span>
          <span className="rounded-full bg-red-50 px-3 py-1 text-red-600">{t("calendar.busy")}</span>
        </div>
      </div>
      <div className="grid min-w-[720px] grid-cols-[150px_repeat(5,1fr)] gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 text-sm dark:border-slate-800 dark:bg-slate-800">
        <div className="bg-slate-50 p-3 font-bold dark:bg-slate-900">{t("calendar.technician")}</div>
        {weekDays.map((day) => <div key={dateKey(day)} className="bg-slate-50 p-3 font-bold dark:bg-slate-900">{dayFormatter.format(day)}</div>)}
        {rows.map((row) => (
          <Fragment key={row.id ?? "unassigned"}>
            <div className="bg-white p-3 font-semibold dark:bg-slate-950">{row.name}</div>
            {weekDays.map((day) => {
              const cellBookings = bookingsForCell(bookings, row.id, day);
              return (
                <div key={`${row.id ?? "unassigned"}-${dateKey(day)}`} className="min-h-24 space-y-2 bg-white p-2 dark:bg-slate-950">
                  {cellBookings.length === 0 && <div className="h-full rounded-lg border border-dashed border-slate-200 dark:border-slate-800" />}
                  {cellBookings.map((booking) => (
                    <div key={booking.id} className="rounded-lg bg-cyan/10 p-2 text-xs font-semibold text-cyan">
                      <p>{booking.scheduledTime} {booking.service?.name ?? booking.serviceId}</p>
                      <p className="mt-1 text-[11px] text-slate-500">{booking.customer?.name ?? booking.address}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </Fragment>
        ))}
        {technicians.length === 0 && bookings.length === 0 && (
          <div className="col-span-6 bg-white p-4 text-sm font-semibold text-slate-500 dark:bg-slate-950">{t("calendar.empty")}</div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        {bookings.map((booking) => <StatusBadge key={booking.id} status={booking.status} />)}
      </div>
    </Card>
  );
}
