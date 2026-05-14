"use client";

import { useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/i18n";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 w-[min(360px,calc(100vw-2rem))] rounded-lg border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <div>
              <p className="font-black">{t("chat.live")}</p>
              <p className="text-xs text-emerald">{t("chat.online")}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={t("chat.close")}><X className="h-5 w-5" /></button>
          </div>
          <div className="space-y-3 p-4">
            <div className="max-w-[80%] rounded-xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{t("chat.message1")}</div>
            <div className="ml-auto max-w-[80%] rounded-xl bg-primary p-3 text-sm text-white">{t("chat.message2")}</div>
            <p className="text-xs text-slate-400">{t("chat.typing")}</p>
          </div>
          <div className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-800">
            <Input placeholder={t("chat.placeholder")} />
            <Button className="h-12 w-12 px-0"><Send className="h-4 w-4" /></Button>
          </div>
        </div>
      )}
      <Button className="h-14 w-14 rounded-full px-0" onClick={() => setOpen((value) => !value)} aria-label={t("chat.open")}>
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
