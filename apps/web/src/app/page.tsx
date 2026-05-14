"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, CheckCircle2, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ServiceCard } from "@/components/services/service-card";
import { useI18n } from "@/i18n/i18n";
import { useAvailability, useServices } from "@/hooks/use-platform-data";

export default function HomePage() {
  const { t } = useI18n();
  const { data: services = [], isLoading } = useServices();
  const today = new Date().toISOString().slice(0, 10);
  const { data: slots = [] } = useAvailability(today, services[0]?.id);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=85" alt="HVAC technician installing air conditioner" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-slate-950/60" />
        </div>
        <div className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4 text-cyan" /> {t("home.badge")}
            </span>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">{t("home.title")}</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-200">{t("home.subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button className="h-12">
                <Link href="/booking" className="flex items-center gap-2">{t("home.bookInstallation")} <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button variant="secondary" className="h-12 bg-white/90">
                <Link href="/admin">{t("home.viewCrm")}</Link>
              </Button>
            </div>
          </div>
          <Card className="glass p-5 text-slate-950">
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
        {!isLoading && services.length === 0 && <p className="text-sm font-semibold text-slate-500">No active services configured yet.</p>}
        <div className="grid gap-5 md:grid-cols-3">
          {services.slice(0, 6).map((service) => <ServiceCard key={service.id} service={service} />)}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-slate-950">
        <div className="container grid gap-6 md:grid-cols-4">
          {[
            ["12 min", t("home.stat.response")],
            ["98.7%", t("home.stat.arrival")],
            ["24/7", t("home.stat.emergency")],
            ["4.92", t("home.stat.rating")]
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-slate-200 p-6 text-center dark:border-slate-800">
              <p className="text-4xl font-black text-cyan">{value}</p>
              <p className="mt-2 text-sm text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container grid gap-8 py-16 lg:grid-cols-2">
        <div>
          <p className="font-bold text-cyan">{t("home.why")}</p>
          <h2 className="mt-2 text-3xl font-black">{t("home.whyTitle")}</h2>
          <div className="mt-6 space-y-4">
            {[t("home.reason1"), t("home.reason2"), t("home.reason3")].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald" />
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <Card className="space-y-4">
          <p className="text-sm font-bold text-slate-500">{t("home.mapsZone")}</p>
          <div className="grid h-80 place-items-center rounded-lg bg-slate-100 dark:bg-slate-900">
            <div className="text-center">
              <MapPin className="mx-auto h-10 w-10 text-cyan" />
              <p className="mt-2 font-black">NYC, Jersey City, Newark</p>
              <p className="text-sm text-slate-500">{t("home.mapsNote")}</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="container pb-16">
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
