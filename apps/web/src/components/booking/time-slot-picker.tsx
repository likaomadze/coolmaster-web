"use client";

import { cn } from "@/lib/utils";

type SlotOption = {
  slot: string;
  available: boolean;
  locked?: boolean;
};

export function TimeSlotPicker({ value, onChange, slots }: { value: string; onChange: (slot: string) => void; slots: SlotOption[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {slots.map((option) => {
        const unavailable = !option.available || option.locked;
        return (
          <button
            key={option.slot}
            disabled={unavailable}
            onClick={() => onChange(option.slot)}
            className={cn(
              "h-12 rounded-xl border text-sm font-semibold transition",
              unavailable && "cursor-not-allowed border-red-100 bg-red-50 text-red-400",
              !unavailable && value !== option.slot && "border-emerald-200 bg-emerald-50 text-emerald-700 hover:-translate-y-0.5",
              value === option.slot && "border-cyan bg-cyan text-white shadow-glow"
            )}
          >
            {option.slot}
          </button>
        );
      })}
    </div>
  );
}
