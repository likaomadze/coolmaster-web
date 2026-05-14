import { Fragment } from "react";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useI18n } from "@/i18n/i18n";
import { useBookings, useTechnicians } from "@/hooks/use-platform-data";

export function CalendarWidget() {
  const { t } = useI18n();
  const { data: bookings = [] } = useBookings();
  const { data: technicians = [] } = useTechnicians();

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
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => <div key={day} className="bg-slate-50 p-3 font-bold dark:bg-slate-900">{day}</div>)}
        {technicians.length === 0 && (
          <div className="col-span-6 bg-white p-4 text-sm font-semibold text-slate-500 dark:bg-slate-950">No technicians configured yet.</div>
        )}
        {technicians.map((tech) => (
          <Fragment key={tech.id}>
            <div key={`${tech.id}-name`} className="bg-white p-3 font-semibold dark:bg-slate-950">{tech.user.name}</div>
            {[0, 1, 2, 3, 4].map((day) => (
              <div key={`${tech.id}-${day}`} className="min-h-24 bg-white p-2 dark:bg-slate-950">
                {bookings.filter((booking) => booking.technicianId === tech.id).slice(day, day + 1).map((booking) => (
                  <div key={booking.id} className="rounded-lg bg-cyan/10 p-2 text-xs font-semibold text-cyan">
                    {booking.scheduledTime} {booking.service?.name ?? booking.serviceId}
                  </div>
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {bookings.map((booking) => <StatusBadge key={booking.id} status={booking.status} />)}
      </div>
    </Card>
  );
}
