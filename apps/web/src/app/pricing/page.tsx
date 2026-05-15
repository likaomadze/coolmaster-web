"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { serviceCatalog } from "@/data/service-catalog";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import { useServices } from "@/hooks/use-platform-data";

const installationSlugs = ["installation", "installation-60", "installation-80", "installation-100"];

export default function PricingPage() {
  const { locale, t } = useI18n();
  const { data: services = [], isLoading } = useServices();
  const catalog = services.length > 0 ? services : serviceCatalog;
  const [selectedServiceId, setSelectedServiceId] = useState(catalog[0]?.id ?? "");
  const [needsDrilling, setNeedsDrilling] = useState(false);
  const selectedService = catalog.find((service) => service.id === selectedServiceId) ?? catalog[0];
  const isInstallation = selectedService ? installationSlugs.includes(selectedService.slug) : false;
  const calculation = useMemo(() => {
    const basePrice = Number(selectedService?.price ?? 0);
    return basePrice + (isInstallation && needsDrilling ? 120 : 0);
  }, [isInstallation, needsDrilling, selectedService?.price]);

  const selectedText = selectedService ? serviceText(selectedService, locale) : null;
  const showVariablePrice = selectedService?.slug === "cleaning" || selectedService?.slug === "repair";

  return (
    <section className="container grid gap-8 py-12 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="font-bold text-cyan">{t("pricing.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("pricing.title")}</h1>
        {isLoading && <p className="mt-8 text-sm font-semibold text-slate-500">Loading pricing...</p>}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {catalog.map((service) => (
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
      <Card className="h-fit space-y-5">
        <div>
          <p className="text-sm font-bold text-cyan">{t("pricing.eyebrow")}</p>
          <h2 className="mt-1 text-2xl font-black">{t("pricing.calculateTitle")}</h2>
        </div>
        <label className="block text-sm font-semibold">
          {t("booking.service")}
          <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950" value={selectedService?.id ?? ""} onChange={(event) => {
            setSelectedServiceId(event.target.value);
            setNeedsDrilling(false);
          }}>
            {catalog.map((service) => <option key={service.id} value={service.id}>{serviceText(service, locale).name}</option>)}
          </select>
        </label>
        {isInstallation && (
          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4 text-sm font-semibold dark:border-slate-800">
            <span>{t("pricing.drilling")}</span>
            <input className="h-5 w-5 accent-cyan" type="checkbox" checked={needsDrilling} onChange={(event) => setNeedsDrilling(event.target.checked)} />
          </label>
        )}
        <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500">{selectedText?.name}</p>
          {showVariablePrice ? (
            <p className="mt-2 text-3xl font-black text-cyan">{selectedService?.slug === "cleaning" ? "100-150 ლარი" : t("pricing.byAssessment")}</p>
          ) : (
            <p className="mt-2 text-3xl font-black text-cyan">{money(calculation)}</p>
          )}
          {isInstallation && needsDrilling && <p className="mt-2 text-xs font-semibold text-slate-500">{t("pricing.drillingIncluded")}</p>}
        </div>
      </Card>
    </section>
  );
}
