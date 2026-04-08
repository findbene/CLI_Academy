import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false, follow: false },
};


interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <main className="page-shell">
      <AuthCard mode="login" nextHref={next ?? null} />
    </main>
  );
}
