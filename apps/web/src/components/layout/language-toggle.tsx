"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export function LanguageToggle() {
  const { locale, setLocale, t } = useI18n();

  return (
    <button
      aria-label={t("nav.language")}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
      onClick={() => setLocale(locale === "ka" ? "en" : "ka")}
    >
      <Languages className="h-4 w-4" />
      {locale === "ka" ? "KA" : "EN"}
    </button>
  );
}
