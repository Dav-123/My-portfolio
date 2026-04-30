import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import AnimatedFavicon from "@/components/AnimatedFavicon";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://david-briggs.vercel.app"),
  title: {
    default: "David Briggs | Software Developer from Abonnema, Nigeria",
    template: "%s | David Briggs",
  },
  description:
    "David Briggs is a full-stack software developer from Abonnema, Rivers State, Nigeria. He builds digital solutions that simplify complexity. University of Port Harcourt undergraduate specializing in React, Next.js, React Native, Python, and AI-powered platforms. Creator of VeriRide Nigeria, DocVault, and B-Chat.",
  keywords: [
    "David Briggs",
    "David Briggs developer",
    "David Briggs software developer",
    "David Briggs Nigeria",
    "David Briggs Abonnema",
    "David Briggs Port Harcourt",
    "David Briggs Africa",
    "David Ekine Briggs",
    "David Ekine Briggs Abonnema",
    "David Ekine Briggs Software developer",
    "Software developer Nigeria",
    "Full stack developer Rivers State",
    "Nigerian software engineer",
    "React developer Nigeria",
    "Next.js developer Nigeria",
    "React Native developer Africa",
    "Python developer Port Harcourt",
    "VeriRide Nigeria",
    "SafeRide Nigeria",
    "DocVault",
    "B-Chat",
    "Game-Buddy-Matcher",
    "Primetime Comics",
    "University of Port Harcourt developer",
    "Nigerian Physicist",
    "Problem solver Nigeria",
    "Offline-first developer",
    "Social impact tech Nigeria",
  ],
  authors: [{ name: "David Briggs", url: "https://david-briggs.vercel.app" }],
  creator: "David Briggs",
  publisher: "David Briggs",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://david-briggs.vercel.app",
    siteName: "David Briggs Portfolio",
    title: "David Briggs | Software Developer from Abonnema, Nigeria",
    description:
      "Full-stack developer from Abonnema, Rivers State, Nigeria. Building impactful digital products for Africa and beyond. 12+ languages, React, Next.js, React Native, Python, AI/ML.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "David Briggs - Software Developer from Abonnema, Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Briggs | Software Developer from Abonnema, Nigeria",
    description: "Full-stack developer building digital solutions that simplify complexity. React, Next.js, React Native, Python, AI/ML.",
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
  alternates: {
    canonical: "https://david-briggs.vercel.app",
  },
  category: "technology",
};

const jsonLdPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Briggs",
  alternateName: ["David Ekine Briggs", "David Briggs Nigeria"],
  url: "https://david-briggs.vercel.app",
  image: "https://david-briggs.vercel.app/profile.jpg",
  jobTitle: "Software Developer",
  description: "Full-stack software developer from Abonnema, Rivers State, Nigeria. Building digital solutions that simplify complexity.",
  knowsAbout: [
    "React", "Next.js", "React Native", "TypeScript", "JavaScript", "Python",
    "Node.js", "PostgreSQL", "SQLite", "Tailwind CSS", "AI/ML", "Offline-First Architecture",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Port Harcourt",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Port Harcourt",
    addressRegion: "Rivers State",
    addressCountry: "NG",
  },
  sameAs: [
    "https://github.com/dav-123",
    "https://www.linkedin.com/in/david-briggs-bb5b4a379",
    "https://www.instagram.com/davidbriggs001",
    "https://www.facebook.com/profile.php?id=100089440026395",
  ],
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "David Briggs Portfolio",
  url: "https://david-briggs.vercel.app",
  description: "Portfolio of David Briggs, a full-stack software developer from Abonnema, Nigeria.",
  author: {
    "@type": "Person",
    name: "David Briggs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <link rel="canonical" href="https://david-briggs.vercel.app" />
        <meta name="geo.region" content="NG-RI" />
        <meta name="geo.placename" content="Port Harcourt" />
        <meta name="google-site-verification" content="2CwhtIyL-D38le9StklEvLvLr8AQ1oKe0XxU4s1tMFs" />
      </head>
      <body className="noise font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AnimatedFavicon />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1c1917",
                color: "#fafaf9",
                border: "1px solid rgba(249,115,22,0.3)",
                borderRadius: "1rem",
                fontFamily: "var(--font-body)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
