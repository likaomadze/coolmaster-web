"use client";

import { Bell, CalendarClock, FileText, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BookingTable } from "@/components/admin/booking-table";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n";

export default function CustomerDashboardPage() {
  const { t } = useI18n();
  const cards: Array<[LucideIcon, string, string]> = [
    [CalendarClock, t("dashboard.nextService"), "May 16, 09:30"],
    [Bell, t("dashboard.notifications"), "4 unread"],
    [MessageSquare, t("dashboard.support"), t("chat.online")],
    [FileText, t("dashboard.invoices"), "$478 paid"]
  ];

  return (
    <section className="container py-12">
      <div className="mb-8">
        <p className="font-bold text-cyan">{t("dashboard.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("dashboard.title")}</h1>
      </div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        {cards.map(([Icon, label, value]) => (
          <Card key={label}>
            <Icon className="h-6 w-6 text-cyan" />
            <p className="mt-4 text-sm text-slate-500">{label}</p>
            <p className="font-black">{value}</p>
          </Card>
        ))}
      </div>
      <BookingTable scope="customer" />
    </section>
  );
}
