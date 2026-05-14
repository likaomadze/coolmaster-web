"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import type { ApiService } from "@/types/api";

export function ServiceCard({ service }: { service: ApiService }) {
  const { locale, t } = useI18n();
  const text = serviceText(service, locale);

  return (
    <Card className="overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/10]">
        {service.image ? (
          <Image src={service.image} alt={text.name} fill className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center bg-slate-100 text-sm font-semibold text-slate-500 dark:bg-slate-900">AeroFlow</div>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-black">{text.name}</h3>
            <span className="font-black text-cyan">{money(Number(service.price))}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{text.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-slate-500">
            <Clock className="h-4 w-4" /> {service.estimatedDuration} {t("service.minutes")}
          </span>
          <Button>
            <Link href={`/booking?service=${service.id}`}>{t("service.book")}</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
