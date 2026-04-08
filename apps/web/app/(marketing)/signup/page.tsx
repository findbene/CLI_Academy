import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";

export const metadata: Metadata = {
  title: "Sign up",
  robots: { index: false, follow: false },
};


interface SignupPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const { next } = await searchParams;

  return (
    <main className="page-shell">
      <AuthCard mode="signup" nextHref={next ?? null} />
    </main>
  );
}
