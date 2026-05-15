"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarCheck, Menu, Moon, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/i18n";
import { LanguageToggle } from "./language-toggle";
import { useAuth } from "@/hooks/use-auth";

const nav = [
  ["nav.services", "/services"],
  ["nav.pricing", "/pricing"],
  ["nav.booking", "/booking"],
  ["nav.dashboard", "/dashboard"],
  ["nav.admin", "/admin"]
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const { isAdmin, isAuthenticated } = useAuth();
  const router = useRouter();
  const visibleNav = nav.filter(([label]) => label !== "nav.admin" || isAdmin);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-base font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
            <CalendarCheck className="h-5 w-5" />
          </span>
          Coolmaster
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {visibleNav.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-xl px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
              {t(label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            aria-label={t("nav.toggleTheme")}
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunMedium className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>
          <Button className="hidden md:inline-flex">
            <Link href="/booking">{t("nav.bookNow")}</Link>
          </Button>
          {isAuthenticated ? (
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              onClick={() => {
                window.localStorage.removeItem("accessToken");
                window.localStorage.removeItem("refreshToken");
                router.push("/");
                router.refresh();
              }}
            >
              {t("nav.logout")}
            </Button>
          ) : (
            <Button variant="secondary" className="hidden md:inline-flex">
              <Link href="/login">{t("nav.login")}</Link>
            </Button>
          )}
          <button aria-label={t("nav.openMenu")} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 md:hidden dark:border-slate-800">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
