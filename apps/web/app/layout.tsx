import type { Metadata } from "next";
import { Sora, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import { SearchDialog } from "@/components/ui/search-dialog";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { FloatingTutor } from "@/components/tutor/FloatingTutor";
import { TutorRuntimeProvider } from "@/components/tutor/TutorRuntimeProvider";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cliacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CLI Academy",
    template: "%s | CLI Academy",
  },
  description:
    "The safest, most beginner-friendly place to set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools.",
  openGraph: {
    type: "website",
    siteName: "CLI Academy",
    title: "CLI Academy — Master Claude Code",
    description:
      "The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CLI Academy — Master Claude Code",
    description:
      "The safest, most beginner-friendly way to go from zero to productive with Claude Code and secure AI agent workflows.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full antialiased ${sora.variable} ${instrumentSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-full">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <TutorRuntimeProvider>
            <SearchDialog />
            <FloatingTutor />
            {children}
          </TutorRuntimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
