import type { Locale } from "./i18n";

export function serviceText(service: { name: string; nameKa?: string | null; description: string; descriptionKa?: string | null }, locale: Locale) {
  return {
    name: locale === "ka" ? service.nameKa ?? service.name : service.name,
    description: locale === "ka" ? service.descriptionKa ?? service.description : service.description
  };
}
