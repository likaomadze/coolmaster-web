"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n";
import { useAnalytics } from "@/hooks/use-platform-data";

export function RevenueChart() {
  const { t } = useI18n();
  const { data: overview } = useAnalytics();
  const data = [{ label: "Current", revenue: Number(overview?.revenue ?? 0), bookings: overview?.bookings ?? 0 }];

  return (
    <Card className="h-80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{t("analytics.revenue")}</p>
          <h3 className="text-xl font-black">{t("analytics.growth")}</h3>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#06B6D4" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
