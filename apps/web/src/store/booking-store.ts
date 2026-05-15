import { create } from "zustand";

type BookingDraft = {
  serviceId: string;
  date: string;
  slot: string;
  address: string;
  notes: string;
  concreteDrilling: boolean;
  photos: File[];
  setField: <K extends keyof Omit<BookingDraft, "setField">>(key: K, value: BookingDraft[K]) => void;
  reset: () => void;
};

export const useBookingStore = create<BookingDraft>((set) => ({
  serviceId: "installation",
  date: "",
  slot: "",
  address: "",
  notes: "",
  concreteDrilling: false,
  photos: [],
  setField: (key, value) => set({ [key]: value } as Partial<BookingDraft>),
  reset: () => set({ serviceId: "installation", date: "", slot: "", address: "", notes: "", concreteDrilling: false, photos: [] })
}));
