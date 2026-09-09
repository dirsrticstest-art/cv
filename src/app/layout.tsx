import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed Abdelatif | Python Backend Developer & AI Automation",
  description:
    "Python Backend Developer specializing in FastAPI, PostgreSQL, Redis queues, WhatsApp Cloud API integrations, and AI-powered automation systems. View my projects and experience.",
  keywords: [
    "Python Developer",
    "FastAPI",
    "Backend Developer",
    "PostgreSQL",
    "Redis",
    "AI Automation",
    "WhatsApp API",
    "RAG",
    "ChromaDB",
    "Cairo Egypt",
  ],
  authors: [{ name: "Ahmed Mohamed Abdelatif" }],
  openGraph: {
    title: "Ahmed Abdelatif | Python Backend Developer & AI Automation",
    description:
      "Python Backend Developer specializing in FastAPI, PostgreSQL, Redis queues, WhatsApp Cloud API integrations, and AI-powered automation systems.",
    url: "https://cv-tawny-two.vercel.app",
    siteName: "Ahmed Abdelatif - CV",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abdelatif | Python Backend Developer",
    description:
      "Python Backend Developer specializing in FastAPI, PostgreSQL, Redis, and AI automation.",
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
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0b0f17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Mohamed Abdelatif",
    jobTitle: "Python Backend Developer & AI Automation Specialist",
    url: "https://cv-tawny-two.vercel.app",
    email: "ahmeeedmohaaamed1@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: [
      "https://github.com/ahmed-abdelatif",
      "https://www.linkedin.com/in/ahmed-abdelatif",
    ],
    knowsAbout: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AI Automation",
      "RAG",
      "ChromaDB",
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.classList.add(theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
