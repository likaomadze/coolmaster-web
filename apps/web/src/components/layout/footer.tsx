"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/i18n";

export function Footer() {
  const { t } = useI18n();
  const groups = [
    ["footer.services", [
      ["nav.services", "/services"],
      ["nav.booking", "/booking"],
      ["nav.pricing", "/pricing"],
      ["dashboard.support", "/contact"]
    ]],
    ["footer.company", [
      ["about.eyebrow", "/about"],
      ["contact.eyebrow", "/contact"],
      ["footer.certifications", "/about"]
    ]]
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="container grid gap-8 md:grid-cols-4">
        <div>
          <p className="font-black">Coolmaster</p>
          <p className="mt-3 text-sm text-slate-500">{t("footer.description")}</p>
        </div>
        {groups.map(([title, items]) => (
          <div key={title as string} className="space-y-2 text-sm">
            <p className="font-semibold">{t(title as string)}</p>
            {(items as string[][]).map(([label, href]) => (
              <Link key={`${label}-${href}`} href={href} className="block text-slate-500 hover:text-cyan">
                {t(label)}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}
