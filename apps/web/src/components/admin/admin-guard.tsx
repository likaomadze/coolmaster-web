"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <section className="container py-12 text-sm font-semibold text-slate-500">Checking access...</section>;
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <section className="container grid min-h-[60vh] place-items-center py-12">
        <Card className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="mt-4 text-2xl font-black">Admin access only</h1>
          <p className="mt-2 text-sm text-slate-500">This panel is visible only for users with ADMIN or SUPER_ADMIN role.</p>
          <Button className="mt-5">
            <Link href="/">Back to website</Link>
          </Button>
        </Card>
      </section>
    );
  }

  return children;
}
