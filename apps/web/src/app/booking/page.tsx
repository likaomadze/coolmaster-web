"use client";

import { useSearchParams } from "next/navigation";
import { CalendarDays, CheckCircle2, Lock } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import { FileUploader } from "@/components/booking/file-uploader";
import { TimeSlotPicker } from "@/components/booking/time-slot-picker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { serviceCatalog } from "@/data/service-catalog";
import { useBookingStore } from "@/store/booking-store";
import { money } from "@/lib/utils";
import { useI18n } from "@/i18n/i18n";
import { serviceText } from "@/i18n/service-text";
import { useAvailability, useServices } from "@/hooks/use-platform-data";
import { useAuth } from "@/hooks/use-auth";

const installationSlugs = ["installation", "installation-60", "installation-80", "installation-100"];
const fallbackSlots = ["08:00", "09:30", "11:00", "13:00", "14:30", "16:00", "18:00"].map((slot) => ({ slot, available: true, locked: false }));

function BookingContent() {
  const params = useSearchParams();
  const draft = useBookingStore();
  const setField = useBookingStore((state) => state.setField);
  const { locale, t } = useI18n();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { data: services = [], isLoading } = useServices();
  const catalog = services.length > 0 ? services : serviceCatalog;
  const today = new Date().toISOString().slice(0, 10);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const selected = catalog.find((service) => service.id === draft.serviceId) ?? catalog[0];
  const isInstallation = selected ? installationSlugs.includes(selected.slug) : false;
  const drillingPrice = isInstallation && draft.concreteDrilling ? 120 : 0;
  const totalPrice = Number(selected?.price ?? 0) + drillingPrice;
  const { data: availability = [], isLoading: availabilityLoading, isError: availabilityError } = useAvailability(draft.date, selected?.id);
  const visibleSlots = availability.length > 0 ? availability : availabilityError && draft.date && selected ? fallbackSlots : availability;
  const selectedText = selected ? serviceText(selected, locale) : { name: t("booking.selectDate"), description: "" };

  useEffect(() => {
    const service = params.get("service");
    if (service) setField("serviceId", service);
  }, [params, setField]);

  useEffect(() => {
    if (!draft.serviceId && catalog[0]) setField("serviceId", catalog[0].id);
  }, [catalog, draft.serviceId, setField]);

  useEffect(() => {
    if (!isInstallation && draft.concreteDrilling) setField("concreteDrilling", false);
  }, [draft.concreteDrilling, isInstallation, setField]);

  async function confirmBooking() {
    if (!selected) return;
    setSubmitting(true);
    setMessage(null);
    try {
      await api.post("/bookings/locks", { date: draft.date, time: draft.slot, serviceId: selected.id });
      await api.post("/bookings", {
        serviceId: selected.id,
        scheduledDate: draft.date,
        scheduledTime: draft.slot,
        address: draft.address,
        notes: draft.concreteDrilling ? `${draft.notes}\n${t("pricing.drilling")} + ${money(120)}`.trim() : draft.notes,
        concreteDrilling: draft.concreteDrilling
      });
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
      setMessage("Booking created successfully.");
    } catch {
      setMessage("Booking failed. Please sign in and check the selected slot.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <div>
          <p className="font-bold text-cyan">{t("booking.eyebrow")}</p>
          <h1 className="mt-2 text-4xl font-black">{t("booking.title")}</h1>
        </div>
        <Card className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              {t("booking.service")}
              <select className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950" value={draft.serviceId} onChange={(event) => {
                setField("serviceId", event.target.value);
                setField("slot", "");
              }}>
                {catalog.map((service) => <option key={service.id} value={service.id}>{serviceText(service, locale).name}</option>)}
              </select>
              {isLoading && <span className="mt-2 block text-xs text-slate-500">Loading services...</span>}
            </label>
            <label className="text-sm font-semibold">
              {t("booking.date")}
              <Input className="mt-2" type="date" min={today} value={draft.date} onChange={(event) => {
                setField("date", event.target.value);
                setField("slot", "");
              }} />
            </label>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <CalendarDays className="h-4 w-4 text-cyan" /> {t("booking.liveSlots")}
            </div>
            {availabilityLoading && <p className="mb-2 text-xs font-semibold text-slate-500">Loading availability...</p>}
            {!availabilityLoading && visibleSlots.length === 0 && <p className="mb-2 text-xs font-semibold text-slate-500">Select a service and date to load real slots.</p>}
            {availabilityError && draft.date && <p className="mb-2 text-xs font-semibold text-warning">Live calendar is unavailable, showing standard slots.</p>}
            <TimeSlotPicker value={draft.slot} onChange={(slot) => setField("slot", slot)} slots={visibleSlots} />
          </div>
          {isInstallation && (
            <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4 text-sm font-semibold dark:border-slate-800">
              <span>{t("pricing.drilling")} <strong className="text-cyan">+{money(120)}</strong></span>
              <input className="h-5 w-5 accent-cyan" type="checkbox" checked={draft.concreteDrilling} onChange={(event) => setField("concreteDrilling", event.target.checked)} />
            </label>
          )}
          <label className="block text-sm font-semibold">
            {t("booking.address")}
            <Input className="mt-2" placeholder={t("booking.addressPlaceholder")} value={draft.address} onChange={(event) => setField("address", event.target.value)} />
          </label>
          <FileUploader onChange={(files) => setField("photos", files)} />
          <label className="block text-sm font-semibold">
            {t("booking.notes")}
            <textarea className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-white p-4 outline-none focus:border-cyan dark:border-slate-800 dark:bg-slate-950" value={draft.notes} onChange={(event) => setField("notes", event.target.value)} placeholder={t("booking.notesPlaceholder")} />
          </label>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-black">{t("booking.summary")}</p>
            <Lock className="h-4 w-4 text-emerald" />
          </div>
          <div className="space-y-2 text-sm text-slate-500">
            <p className="flex justify-between"><span>{t("booking.service")}</span><strong className="text-slate-900 dark:text-white">{selectedText.name}</strong></p>
            <p className="flex justify-between"><span>{t("booking.date")}</span><strong className="text-slate-900 dark:text-white">{draft.date || t("booking.selectDate")}</strong></p>
            <p className="flex justify-between"><span>{t("table.schedule")}</span><strong className="text-slate-900 dark:text-white">{draft.slot || t("booking.selectSlot")}</strong></p>
            {isInstallation && draft.concreteDrilling && <p className="flex justify-between"><span>{t("pricing.drilling")}</span><strong className="text-slate-900 dark:text-white">+{money(120)}</strong></p>}
            <p className="flex justify-between"><span>{t("booking.photos")}</span><strong className="text-slate-900 dark:text-white">{draft.photos.length}</strong></p>
          </div>
          <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
            <p className="flex items-center justify-between text-lg font-black"><span>{t("booking.total")}</span>{money(totalPrice)}</p>
          </div>
          {isAuthenticated ? (
            <Button className="w-full" disabled={!selected || submitting || !draft.date || !draft.slot || !draft.address} onClick={confirmBooking}>
              <CheckCircle2 className="h-4 w-4" /> {submitting ? "..." : t("booking.confirm")}
            </Button>
          ) : (
            <Button className="w-full">
              <Link href="/login">{t("booking.signInToConfirm")}</Link>
            </Button>
          )}
          {message && <p className="text-xs font-semibold text-slate-500">{message}</p>}
          <p className="text-xs text-slate-500">{t("booking.lockNote")}</p>
        </Card>
      </div>
    </section>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<section className="container py-12">Loading booking flow...</section>}>
      <BookingContent />
    </Suspense>
  );
}
