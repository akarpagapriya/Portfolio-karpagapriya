import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
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

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-karpagapriya.vercel.app"),

  title: {
    default: "Karpagapriya A — UI Engineer | React · Next.js · Figma",
    template: "%s | Karpagapriya A",
  },

  description:
    "UI Engineer based in Madurai, Tamil Nadu. I design in Figma and build in React. Specialising in Next.js, TypeScript, Tailwind CSS and production-grade dashboards. Open to remote and onsite roles.",

  keywords: [
    "UI Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Figma to React",
    "Tailwind CSS",
    "Dashboard Developer",
    "UI Developer Madurai",
    "Frontend Engineer India",
    "Karpagapriya",
    "Portfolio",
  ],

  authors: [{ name: "Karpagapriya A", url: "https://portfolio-karpagapriya.vercel.app" }],
  creator: "Karpagapriya A",

  icons: {
  icon: "/icon.png",
  apple: "/apple-icon.png",
  shortcut: "/favicon.ico",
},

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://portfolio-karpagapriya.vercel.app",
    siteName: "Karpagapriya A — UI Engineer",
    title: "Karpagapriya A — UI Engineer | React · Next.js · Figma",
    description:
      "UI Engineer based in Madurai. I design in Figma and build in React. Specialising in Next.js, TypeScript and production dashboards. Open to roles immediately.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karpagapriya A — UI Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Karpagapriya A — UI Engineer | React · Next.js · Figma",
    description:
      "UI Engineer based in Madurai. Figma to React. Next.js · TypeScript · Tailwind. Open to roles immediately.",
    images: ["/og-image.png"],
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

  verification: {
    google: "CGyeLX0J0b7V8tuddTYrcmFDM96d-6vkwD7Az5ENhr8",
  },

  alternates: {
    canonical: "https://portfolio-karpagapriya.vercel.app",
  },

                                                                                                 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} font-dm antialiased noise-overlay`}
      >
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

