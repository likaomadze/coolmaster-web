"use client";

import { ServiceCard } from "@/components/services/service-card";
import { serviceCatalog } from "@/data/service-catalog";
import { useServices } from "@/hooks/use-platform-data";
import { useI18n } from "@/i18n/i18n";

export default function ServicesPage() {
  const { t } = useI18n();
  const { data: services = [], isLoading } = useServices();
  const catalog = services.length > 0 ? services : serviceCatalog;

  return (
    <section className="container py-12">
      <div className="mb-8 max-w-3xl">
        <p className="font-bold text-cyan">{t("services.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("services.title")}</h1>
      </div>
      {isLoading && <p className="text-sm font-semibold text-slate-500">Loading services...</p>}
      <div className="grid gap-5 md:grid-cols-3">
        {catalog.map((service) => <ServiceCard key={service.id} service={service} />)}
      </div>
    </section>
  );
}
