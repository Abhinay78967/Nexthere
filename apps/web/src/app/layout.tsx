import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://nexthere-web.vercel.app');

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NextHere Services | Enterprise IT, Electrical Infrastructure & Logistics",
    template: "%s | NextHere Services",
  },
  description: "NextHere Services delivers integrated solutions across IT consultancy, commercial electrical installations, and motorised road freight logistics.",
  keywords: [
    "NextHere Services",
    "IT Consultancy India",
    "Commercial Electrical Installations",
    "Motorised Road Freight",
    "Network Infrastructure Management",
    "Industrial Automation",
    "Supply Chain Logistics New Delhi",
    "Power Distribution Control Panels",
    "Enterprise Solutions India"
  ],
  authors: [{ name: "NextHere Services Private Limited", url: BASE_URL }],
  creator: "NextHere Services Private Limited",
  publisher: "NextHere Services Private Limited",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "NextHere Services",
    title: "NextHere Services | Enterprise IT, Electrical & Logistics",
    description: "Integrated enterprise capabilities across technology, electrical infrastructure, and freight logistics.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NextHere Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextHere Services | Enterprise IT, Electrical & Logistics",
    description: "Integrated enterprise solutions across IT consultancy, electrical installations, and freight logistics.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrganizationSchema />
        <WebSiteSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
