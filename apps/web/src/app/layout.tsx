import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingChat } from "@/components/chat/floating-chat";

export const metadata: Metadata = {
  title: "AeroFlow HVAC Platform",
  description: "Premium AC installation, maintenance, diagnostics and field service management platform.",
  manifest: "/manifest.json"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>
          <Header />
          <main>{children}</main>
          <FloatingChat />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
