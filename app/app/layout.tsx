import type { Metadata } from "next";
import { Sora, IBM_Plex_Mono } from "next/font/google";
import { SearchDialog } from "@/components/ui/search-dialog";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "CLI Academy",
    template: "%s | CLI Academy",
  },
  description:
    "The safest, most beginner-friendly place to set up, troubleshoot, understand, and start using Claude Code, Claude CoWork, and related agentic tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sora.variable} ${ibmPlexMono.variable}`}
    >
      <body className="min-h-full">
        <SearchDialog />
        {children}
      </body>
    </html>
  );
}
