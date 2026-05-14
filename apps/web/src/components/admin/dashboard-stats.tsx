"use client";

import { CalendarCheck, DollarSign, Star, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n";
import { useAnalytics } from "@/hooks/use-platform-data";
import { money } from "@/lib/utils";

export function DashboardStats() {
  const { t } = useI18n();
  const { data } = useAnalytics();
  const stats = [
    { label: "Revenue", value: money(Number(data?.revenue ?? 0)), icon: DollarSign, trend: "Live" },
    { label: "Bookings", value: String(data?.bookings ?? 0), icon: CalendarCheck, trend: "Live" },
    { label: "Customers", value: "-", icon: Users, trend: "CRM" },
    { label: "Avg rating", value: String(data?.customerSatisfaction ?? 0), icon: Star, trend: "Live" }
  ];
  const labels = [t("table.total"), t("nav.booking"), t("admin.customers"), t("admin.avgRating")];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={stat.label}>
          <div className="flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan/10 text-cyan">
              <stat.icon className="h-5 w-5" />
            </span>
            <span className="text-xs font-bold text-emerald">{stat.trend}</span>
          </div>
          <p className="mt-5 text-sm text-slate-500">{labels[index]}</p>
          <p className="text-2xl font-black">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
}
