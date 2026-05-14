"use client";

import { Activity, Plus } from "lucide-react";
import { BookingTable } from "@/components/admin/booking-table";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { RevenueChart } from "@/components/analytics/revenue-chart";
import { CalendarWidget } from "@/components/calendar/calendar-widget";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n";
import { AdminGuard } from "@/components/admin/admin-guard";
import { useNotifications, useTechnicians } from "@/hooks/use-platform-data";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}

function AdminDashboardContent() {
  const { t } = useI18n();
  const { data: technicians = [], isLoading: techniciansLoading } = useTechnicians();
  const { data: notifications = [], isLoading: notificationsLoading } = useNotifications();

  return (
    <section className="container py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-bold text-cyan">{t("admin.eyebrow")}</p>
          <h1 className="mt-1 text-4xl font-black">{t("admin.title")}</h1>
        </div>
        <Button><Plus className="h-4 w-4" /> {t("admin.create")}</Button>
      </div>
      <DashboardStats />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <RevenueChart />
        <Card>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-cyan" />
            <h2 className="font-black">{t("admin.activity")}</h2>
          </div>
          <div className="space-y-4">
            {notificationsLoading && <p className="text-sm text-slate-500">Loading activity...</p>}
            {!notificationsLoading && notifications.length === 0 && <p className="text-sm text-slate-500">No live activity yet.</p>}
            {notifications.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-lg bg-slate-50 p-3 text-sm font-medium dark:bg-slate-900">
                <p className="font-bold">{item.title}</p>
                <p className="text-slate-500">{item.body}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <BookingTable />
          <div className="overflow-x-auto"><CalendarWidget /></div>
        </div>
        <Card>
          <h2 className="font-black">{t("admin.technicians")}</h2>
          <div className="mt-4 space-y-3">
            {techniciansLoading && <p className="text-sm text-slate-500">Loading technicians...</p>}
            {!techniciansLoading && technicians.length === 0 && <p className="text-sm text-slate-500">No technicians configured yet.</p>}
            {technicians.map((tech) => (
              <div key={tech.id} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <p className="font-bold">{tech.user.name}</p>
                  <span className="text-xs font-bold text-emerald">{tech.rating}</span>
                </div>
                <p className="text-sm text-slate-500">{tech.zone ?? "No zone"} · {tech.bookings?.length ?? 0} jobs</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
