"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, Gauge, ShieldCheck, Snowflake, ThermometerSnowflake, Wind, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/services/service-card";
import { serviceCatalog } from "@/data/service-catalog";
import { useI18n } from "@/i18n/i18n";
import { useAvailability, useServices } from "@/hooks/use-platform-data";

export default function HomePage() {
  const { t } = useI18n();
  const { data: services = [], isLoading } = useServices();
  const catalog = services.length > 0 ? services : serviceCatalog;
  const today = new Date().toISOString().slice(0, 10);
  const { data: slots = [] } = useAvailability(today, services[0]?.id);

  return (
    <>
      <section className="ac-hero relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="ac-hero-grid" />
          <div className="ac-air-stream ac-air-stream-one" />
          <div className="ac-air-stream ac-air-stream-two" />
          <div className="ac-air-stream ac-air-stream-three" />
          <div className="ac-snowflake ac-snowflake-one"><Snowflake className="h-5 w-5" /></div>
          <div className="ac-snowflake ac-snowflake-two"><Snowflake className="h-4 w-4" /></div>
          <div className="ac-unit">
            <div className="ac-unit-light" />
            <div className="ac-unit-logo">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/DAIKIN_logo.svg" alt="" />
              <span>დაიკინი</span>
            </div>
            <div className="ac-unit-display">18°C</div>
            <div className="ac-unit-outlet">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="ac-unit-flap" />
          </div>
        </div>
        <div className="container relative z-10 grid min-h-[620px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hero-copy max-w-3xl text-white">
            <span className="hero-kicker inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 backdrop-blur">
              <Wind className="h-4 w-4 text-cyan" /> {t("home.badge")}
            </span>
            <h1 className="hero-title mt-6 text-4xl font-black leading-tight md:text-5xl lg:text-6xl">{t("home.title")}</h1>
            <p className="hero-subtitle mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{t("home.subtitle")}</p>
            <div className="hero-actions mt-8 flex flex-wrap gap-3">
              <Button className="h-12">
                <Link href="/booking" className="flex items-center gap-2">{t("home.bookInstallation")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          <Card className="hero-slots glass mt-36 p-5 text-slate-950 lg:mt-56">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{t("home.liveSlots")}</p>
                <h2 className="text-2xl font-black">{t("home.today")}</h2>
              </div>
              <CalendarClock className="h-8 w-8 text-cyan" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {slots.map((slot, index) => (
                <div key={slot.slot} className={`rounded-xl border p-3 text-center text-sm font-bold ${!slot.available || slot.locked ? "border-red-200 bg-red-50 text-red-500" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
                  {slot.slot}
                </div>
              ))}
              {slots.length === 0 && <p className="col-span-2 text-sm font-semibold text-slate-500">Connect API and seed services to show live slots.</p>}
            </div>
          </Card>
        </div>
      </section>

      <section className="container py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-bold text-cyan">{t("home.servicesEyebrow")}</p>
            <h2 className="text-3xl font-black md:text-4xl">{t("home.servicesTitle")}</h2>
          </div>
          <Button variant="secondary"><Link href="/services">{t("home.allServices")}</Link></Button>
        </div>
        {isLoading && <p className="text-sm font-semibold text-slate-500">Loading services...</p>}
        <div className="grid gap-5 md:grid-cols-3">
          {catalog.slice(0, 6).map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>

      <section data-reveal className="bg-white py-16 dark:bg-slate-950">
        <div className="container grid gap-6 md:grid-cols-4">
          {[
            ["12 min", t("home.stat.response")],
            ["98.7%", t("home.stat.arrival")],
            ["24/7", t("home.stat.emergency")],
            ["4.92", t("home.stat.rating")]
          ].map(([value, label]) => (
            <div key={label} data-reveal className="rounded-lg border border-slate-200 p-6 text-center dark:border-slate-800">
              <p className="text-4xl font-black text-cyan">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="container py-16">
        <div className="max-w-3xl">
          <p className="font-bold text-cyan">{t("home.why")}</p>
          <h2 className="mt-2 text-3xl font-black">{t("home.whyTitle")}</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-1">
            {[
              [ThermometerSnowflake, t("home.reason1"), t("home.reason1Text")],
              [Gauge, t("home.reason2"), t("home.reason2Text")],
              [Wrench, t("home.reason3"), t("home.reason3Text")]
            ].map(([Icon, title, text]) => (
              <Card key={title as string} data-reveal className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black">{title as string}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{text as string}</p>
                </div>
              </Card>
            ))}
          </div>
          <Card data-reveal className="relative overflow-hidden bg-slate-950 p-6 text-white">
            <div className="absolute inset-0 opacity-40">
              <div className="ac-hero-grid" />
            </div>
            <div className="relative">
              <p className="text-sm font-bold text-cyan">{t("home.qualityPanel")}</p>
              <div className="mt-6 grid gap-3">
                {[
                  [t("home.panelCheck1"), "98%"],
                  [t("home.panelCheck2"), "120₾"],
                  [t("home.panelCheck3"), "24h"]
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-200"><CheckCircle2 className="h-4 w-4 text-emerald" /> {label}</span>
                    <strong className="text-cyan">{value}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-300">{t("home.qualityText")}</p>
            </div>
          </Card>
        </div>
      </section>

      <section data-reveal className="container pb-16">
        <Card className="flex flex-col items-start justify-between gap-6 bg-primary p-8 text-white md:flex-row md:items-center">
          <div>
            <ShieldCheck className="h-8 w-8 text-cyan" />
            <h2 className="mt-3 text-3xl font-black">{t("home.ctaTitle")}</h2>
            <p className="mt-2 text-slate-300">{t("home.ctaText")}</p>
          </div>
          <Button className="bg-cyan text-slate-950 hover:bg-cyan/90"><Link href="/booking">{t("home.ctaButton")}</Link></Button>
        </Card>
      </section>
    </>
  );
}
