"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/i18n";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <section className="container py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <p className="font-bold text-cyan">{t("about.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black">{t("about.title")}</h1>
          <p className="mt-5 text-slate-600 dark:text-slate-300">{t("about.text")}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[t("about.cert1"), t("about.cert2"), t("about.cert3")].map((item) => <Card key={item} className="font-bold">{item}</Card>)}
          </div>
        </div>
        <div className="relative min-h-96 overflow-hidden rounded-lg">
          <Image src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" alt="Technician team" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
