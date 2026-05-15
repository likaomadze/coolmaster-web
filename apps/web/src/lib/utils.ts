import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function money(value: number) {
  return `${new Intl.NumberFormat("ka-GE", { maximumFractionDigits: 0 }).format(Number(value))} ₾`;
}
