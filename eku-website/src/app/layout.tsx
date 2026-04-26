import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { company } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://eku.ua";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.fullName} (${company.name}) — судова експертиза та оцінка`,
    template: `%s — ${company.name}`,
  },
  description:
    "Експертно-Криміналістична Установа: судово-економічна, товарознавча, будівельно-технічна експертиза та незалежна оцінка. Висновки, що тримаються в суді.",
  keywords: [
    "судова експертиза",
    "економічна експертиза",
    "товарознавча експертиза",
    "будівельно-технічна експертиза",
    "оцінка нерухомості",
    "ЕКУ",
    "експерт",
    "Одеса",
  ],
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: company.fullName,
    title: `${company.fullName} (${company.name})`,
    description:
      "Незалежна судова експертиза та оцінка. Економічна, товарознавча, будівельно-технічна.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
