import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interactive Date Picker with Countdown Timer | MyCalendar App",
  description:
    "Explore a fully interactive date range picker with a real-time countdown. Choose your dates, see the days in range, and enjoy smooth animations!",
  metadataBase: new URL("https://calendaring.netlify.app/"),
  robots: "index, follow",
  openGraph: {
    title: "Interactive Calendar with Countdown Timer",
    description:
      "A beautifully animated calendar tool that lets you pick a date range, view total days, and see a live countdown timer.",
    url: "https://calendaring.netlify.app/",
    siteName: "MyCalendar App",
    images: [
      {
        url: "/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "Preview of Interactive Calendar",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Calendar with Countdown",
    description:
      "Fully interactive calendar with animations and live countdown timer.",
    images: ["/preview-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  applicationName: "Date Range Picker",
  other: {
    "google-site-verification": "e4pplODfxnOVfi3dL36asP0vCLm2xHNMMISDy-KzGfg",
    "ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Date Range Picker",
      url: "https://calendaring.netlify.app/",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      description:
        "An interactive date picker with a real-time countdown, great for planning events or projects.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    }),
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
