"use client";

import { PricingCalculator } from "@/components/booking/pricing-calculator";
import { Card } from "@/components/ui/card";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import { useServices } from "@/hooks/use-platform-data";

export default function PricingPage() {
  const { locale, t } = useI18n();
  const { data: services = [], isLoading } = useServices();
  const basePrice = Number(services[0]?.price ?? 0);

  return (
    <section className="container grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
      <div>
        <p className="font-bold text-cyan">{t("pricing.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("pricing.title")}</h1>
        {isLoading && <p className="mt-8 text-sm font-semibold text-slate-500">Loading pricing...</p>}
        {!isLoading && services.length === 0 && <p className="mt-8 text-sm font-semibold text-slate-500">No pricing rules configured yet.</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Card key={service.id} className="flex items-center justify-between">
              <div>
                <p className="font-black">{serviceText(service, locale).name}</p>
                <p className="text-sm text-slate-500">{service.estimatedDuration} {t("pricing.estimate")}</p>
              </div>
              <p className="text-lg font-black text-cyan">{money(Number(service.price))}</p>
            </Card>
          ))}
        </div>
      </div>
      <PricingCalculator basePrice={basePrice} />
    </section>
  );
}
