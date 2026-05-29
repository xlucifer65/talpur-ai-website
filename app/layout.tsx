import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  title: "Talpur.ai | AI Automation Agency",
  description:
    "Talpur.ai helps businesses automate operations, marketing, sales, and workflows using AI-powered systems — reducing manual work and scaling what matters.",
  keywords: [
    "AI automation",
    "workflow automation",
    "AI agents",
    "CRM automation",
    "lead generation",
    "business process optimization",
    "AI chatbots",
    "marketing automation",
  ],
  openGraph: {
    title: "Talpur.ai | AI Automation Agency",
    description:
      "We automate businesses using AI-powered systems. Workflows, agents, CRM, lead generation, and operations.",
    url: "https://talpur.ai",
    siteName: "Talpur.ai",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Talpur.ai | AI Automation Agency",
    description:
      "We automate businesses using AI-powered systems.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="bg-background text-text-primary font-dm antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Script src="https://zizka.ai/api/agent/embed/cmoq0n41t001vlqjcvkx9uilp" strategy="afterInteractive" />
      </body>
    </html>
  );
}
