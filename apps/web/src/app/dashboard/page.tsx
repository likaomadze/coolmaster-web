"use client";

import { Bell, CalendarClock, FileText, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { BookingTable } from "@/components/admin/booking-table";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";
import { money } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useMyBookings } from "@/hooks/use-platform-data";

export default function CustomerDashboardPage() {
  const { locale, t } = useI18n();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: bookings = [], isLoading } = useMyBookings(isAuthenticated);
  const upcoming = bookings
    .filter((booking) => new Date(`${booking.scheduledDate.slice(0, 10)}T${booking.scheduledTime}`) >= new Date())
    .sort((a, b) => new Date(`${a.scheduledDate.slice(0, 10)}T${a.scheduledTime}`).getTime() - new Date(`${b.scheduledDate.slice(0, 10)}T${b.scheduledTime}`).getTime())[0];
  const dateFormatter = new Intl.DateTimeFormat(locale === "ka" ? "ka-GE" : "en-US", { month: "short", day: "numeric" });
  const nextService = upcoming ? `${dateFormatter.format(new Date(upcoming.scheduledDate))}, ${upcoming.scheduledTime}` : t("dashboard.noUpcoming");
  const totalPaid = bookings.reduce((sum, booking) => sum + Number(booking.totalPrice ?? 0), 0);
  const cards: Array<[LucideIcon, string, string]> = [
    [CalendarClock, t("dashboard.nextService"), nextService],
    [Bell, t("dashboard.bookings"), isLoading ? "..." : String(bookings.length)],
    [MessageSquare, t("dashboard.support"), t("chat.online")],
    [FileText, t("dashboard.invoices"), money(totalPaid)]
  ];

  if (!authLoading && !isAuthenticated) {
    return (
      <section className="container py-12">
        <Card className="mx-auto max-w-xl text-center">
          <CalendarClock className="mx-auto h-10 w-10 text-cyan" />
          <h1 className="mt-4 text-2xl font-black">{t("dashboard.signInTitle")}</h1>
          <p className="mt-2 text-sm text-slate-500">{t("dashboard.signInText")}</p>
          <Button className="mt-6"><Link href="/login">{t("nav.login")}</Link></Button>
        </Card>
      </section>
    );
  }

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
      {!isLoading && bookings.length === 0 && (
        <Card className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="font-black">{t("dashboard.emptyTitle")}</p>
            <p className="mt-1 text-sm text-slate-500">{t("dashboard.emptyText")}</p>
          </div>
          <Button><Link href="/booking">{t("home.bookInstallation")}</Link></Button>
        </Card>
      )}
      <BookingTable scope="customer" />
    </section>
  );
}
