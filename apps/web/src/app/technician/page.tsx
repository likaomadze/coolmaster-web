"use client";

import { Camera, Map, Navigation, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { useTechnicianBookings, useTechnicianMe } from "@/hooks/use-platform-data";

export default function TechnicianPage() {
  const { t } = useI18n();
  const { data: tech } = useTechnicianMe();
  const { data: bookings = [] } = useTechnicianBookings();

  return (
    <section className="container py-12">
      <div className="mb-8">
        <p className="font-bold text-cyan">{t("technician.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("technician.titlePrefix")} {tech?.user.name ?? "-"}</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><Wallet className="text-cyan" /><p className="mt-4 text-sm text-slate-500">{t("technician.earnings")}</p><p className="text-2xl font-black">{money(0)}</p></Card>
        <Card><Navigation className="text-cyan" /><p className="mt-4 text-sm text-slate-500">{t("technician.route")}</p><p className="text-2xl font-black">42 {t("service.minutes")}</p></Card>
        <Card><Camera className="text-cyan" /><p className="mt-4 text-sm text-slate-500">{t("technician.uploads")}</p><p className="text-2xl font-black">0</p></Card>
      </div>
      <div className="mt-6 space-y-4">
        {bookings.length === 0 && <Card className="text-sm font-semibold text-slate-500">No assigned jobs yet.</Card>}
        {bookings.map((booking) => (
          <Card key={booking.id} className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-3"><p className="font-black">{booking.id}</p><StatusBadge status={booking.status} /></div>
              <p className="mt-2 text-sm text-slate-500">{booking.address}</p>
              <p className="text-sm text-slate-500">{booking.scheduledDate} · {booking.scheduledTime}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary"><Map className="h-4 w-4" /> {t("technician.navigate")}</Button>
              <Button>{t("technician.update")}</Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
