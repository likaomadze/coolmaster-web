"use client";

import { ServiceCard } from "@/components/services/service-card";
import { useI18n } from "@/i18n/i18n";
import { useServices } from "@/hooks/use-platform-data";

export default function ServicesPage() {
  const { t } = useI18n();
  const { data: services = [], isLoading } = useServices();

  return (
    <section className="container py-12">
      <div className="mb-8 max-w-3xl">
        <p className="font-bold text-cyan">{t("services.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("services.title")}</h1>
      </div>
      {isLoading && <p className="text-sm font-semibold text-slate-500">Loading services...</p>}
      {!isLoading && services.length === 0 && <p className="text-sm font-semibold text-slate-500">No active services configured yet.</p>}
      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </section>
  );
}
