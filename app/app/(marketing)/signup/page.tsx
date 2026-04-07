import { AuthCard } from "@/components/auth/AuthCard";

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
