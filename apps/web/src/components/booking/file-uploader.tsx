"use client";

import { ImagePlus } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export function FileUploader({ onChange }: { onChange: (files: File[]) => void }) {
  const { t } = useI18n();

  return (
    <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-cyan hover:bg-cyan/5 dark:border-slate-700 dark:bg-slate-900">
      <ImagePlus className="h-7 w-7 text-cyan" />
      <span className="mt-2 text-sm font-semibold">{t("upload.title")}</span>
      <span className="text-xs text-slate-500">{t("upload.help")}</span>
      <input type="file" multiple accept="image/*" className="sr-only" onChange={(event) => onChange(Array.from(event.target.files ?? []))} />
    </label>
  );
}
