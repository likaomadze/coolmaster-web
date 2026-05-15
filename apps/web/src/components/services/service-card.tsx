"use client";

import Link from "next/link";
import { AlertTriangle, Fan, Gauge, ShieldCheck, Snowflake, SprayCan, ThermometerSnowflake, Truck, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import type { ApiService } from "@/types/api";

const serviceIcons = {
  installation: Snowflake,
  "installation-60": Snowflake,
  "installation-80": Snowflake,
  "installation-100": Snowflake,
  maintenance: Fan,
  "gas-refill": Gauge,
  cleaning: SprayCan,
  diagnostics: ThermometerSnowflake,
  relocation: Truck,
  repair: Wrench,
  "emergency-service": AlertTriangle,
  "warranty-inspection": ShieldCheck
};

export function ServiceCard({ service }: { service: ApiService }) {
  const { locale, t } = useI18n();
  const text = serviceText(service, locale);
  const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Wrench;
  const installationSlugs = ["installation", "installation-60", "installation-80", "installation-100"];
  const showDescription = installationSlugs.includes(service.slug) || service.slug === "cleaning" || service.slug === "gas-refill" || service.slug === "repair";
  const priceText = service.slug === "cleaning" ? "100-150 ლარი" : money(Number(service.price));

  return (
    <Card data-reveal className="flex min-h-48 flex-col justify-between gap-5 transition hover:-translate-y-1 hover:shadow-soft">
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan/10 text-cyan">
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-black">{text.name}</h3>
          {service.slug !== "repair" && <span className="shrink-0 font-black text-cyan">{priceText}</span>}
        </div>
        {showDescription && <p className="mt-3 text-sm leading-6 text-slate-500">{text.description}</p>}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("service.available")}</span>
        <Button>
          <Link href={`/booking?service=${service.id}`}>{t("service.book")}</Link>
        </Button>
      </div>
    </Card>
  );
}
