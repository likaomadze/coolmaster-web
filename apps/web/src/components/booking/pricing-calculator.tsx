"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";

export function PricingCalculator({ basePrice }: { basePrice: number }) {
  const { t } = useI18n();
  const [meters, setMeters] = useState(3);
  const [floor, setFloor] = useState(1);
  const [emergency, setEmergency] = useState(false);
  const total = useMemo(() => basePrice + Math.max(0, meters - 3) * 18 + Math.max(0, floor - 2) * 25 + (emergency ? 95 : 0), [basePrice, emergency, floor, meters]);

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-semibold text-slate-500">{t("pricing.dynamic")}</p>
        <p className="text-3xl font-black">{money(total)}</p>
      </div>
      <label className="block text-sm font-semibold">
        {t("pricing.meters")}: {meters}
        <input className="mt-2 w-full accent-cyan" type="range" min={3} max={20} value={meters} onChange={(event) => setMeters(Number(event.target.value))} />
      </label>
      <label className="block text-sm font-semibold">
        {t("pricing.floor")}: {floor}
        <input className="mt-2 w-full accent-cyan" type="range" min={1} max={12} value={floor} onChange={(event) => setFloor(Number(event.target.value))} />
      </label>
      <label className="flex items-center justify-between text-sm font-semibold">
        {t("pricing.emergency")}
        <input className="h-5 w-5 accent-cyan" type="checkbox" checked={emergency} onChange={(event) => setEmergency(event.target.checked)} />
      </label>
    </Card>
  );
}
