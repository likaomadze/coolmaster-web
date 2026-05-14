"use client";

import { Phone, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/i18n";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <section className="container grid gap-8 py-12 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <p className="font-bold text-cyan">{t("contact.eyebrow")}</p>
        <h1 className="mt-2 text-4xl font-black">{t("contact.title")}</h1>
        <Card className="mt-8 space-y-4">
          <Input placeholder={t("contact.name")} />
          <Input placeholder={t("contact.email")} />
          <Input placeholder={t("contact.phone")} />
          <textarea className="min-h-32 w-full rounded-xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-cyan dark:border-slate-800 dark:bg-slate-950" placeholder={t("contact.message")} />
          <Button><Send className="h-4 w-4" /> {t("contact.send")}</Button>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="flex items-center gap-4"><Phone className="text-cyan" /> +1 (555) 019-ACME</Card>
        <Card className="flex items-center gap-4"><MessageCircle className="text-emerald" /> {t("contact.whatsapp")}</Card>
        <Card><div className="grid h-72 place-items-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-900">{t("contact.maps")}</div></Card>
      </div>
    </section>
  );
}
