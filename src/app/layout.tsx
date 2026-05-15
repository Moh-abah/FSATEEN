// Layout file with proper viewport export

import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider, AuthProvider, ThemeProvider } from "@/providers";

// Cairo for headings - bold, modern Arabic
const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Tajawal for body text - clean, readable
const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "فساتين - أناقة الفساتين بين يديك",
    template: "%s | فساتين",
  },
  description: "منصة متكاملة لبيع وشراء الفساتين المستعملة والجديدة في المملكة العربية السعودية. اكتشفي تشكيلة رائعة من الفساتين بأسعار مناسبة.",
  keywords: ["فساتين", "ملابس", "موضة", "سعودية", "بيع", "شراء", "أزياء"],
  authors: [{ name: "فساتين" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "فساتين - أناقة الفساتين بين يديك",
    description: "منصة متكاملة لبيع وشراء الفساتين المستعملة والجديدة في المملكة العربية السعودية",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "فساتين - أناقة الفساتين بين يديك",
    description: "منصة متكاملة لبيع وشراء الفساتين المستعملة والجديدة",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${tajawal.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}