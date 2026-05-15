"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { I18nProvider } from "@/i18n/i18n";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <I18nProvider>
        <QueryClientProvider client={queryClient}>
          <ScrollReveal />
          {children}
        </QueryClientProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
