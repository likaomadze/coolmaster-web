"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/i18n";
import type { ApiUser } from "@/types/api";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: Pick<ApiUser, "id" | "email" | "role">;
};

export default function LoginPage() {
  const { t } = useI18n();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
      window.localStorage.setItem("accessToken", data.accessToken);
      window.localStorage.setItem("refreshToken", data.refreshToken);
      router.push(data.user.role === "ADMIN" || data.user.role === "SUPER_ADMIN" ? "/admin" : "/dashboard");
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container grid min-h-[70vh] place-items-center py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-black">{t("login.title")}</h1>
        <p className="mt-2 text-sm text-slate-500">{t("login.subtitle")}</p>
        <form className="mt-6 space-y-4" onSubmit={submit}>
          <Input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder={t("login.email")} required />
          <Input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder={t("login.password")} required />
          {error && <p className="text-sm font-semibold text-destructive">{t("login.error")}</p>}
          <Button className="w-full" disabled={loading}>{loading ? "..." : t("login.submit")}</Button>
        </form>
      </Card>
    </section>
  );
}
