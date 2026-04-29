import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import AnimatedFavicon from "@/components/AnimatedFavicon";

export const metadata: Metadata = {
  metadataBase: new URL("https://david-briggs.vercel.app"),
  title: {
    default: "David Briggs | Software Developer from Abonnema, Nigeria",
    template: "%s | David Briggs",
  },
  description:
    "David Briggs is a full-stack software developer from Abonnema, Rivers State, Nigeria — building digital solutions that simplify complexity. University of Port Harcourt undergraduate creating impactful technology for Africa.",
  keywords: [
    "David Briggs",
    "David Briggs developer",
    "David Briggs Abonnema",
    "David Briggs Nigeria",
    "David Briggs Africa",
    "David Briggs Port Harcourt",
    "David Ekine Briggs Abonnema",
    "David Ekine Briggs Software developer",
    "Software developer Nigeria",
    "Full stack developer Rivers State",
    "Nigerian software engineer",
    "DocVault",
    "SafeRide Nigeria",
    "B-chat",
    "Game-Buddy-Matcher",
    "Primetime Comics",
    "Problem solver",
    "Nigerian Physicist"
  ],
  authors: [{ name: "David Briggs", url: "https://david-briggs.vercel.app" }],
  creator: "David Briggs",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://david-briggs.vercel.app",
    title: "David Briggs | Software Developer from Abonnema, Nigeria",
    description:
      "Full-stack developer from Abonnema, Rivers State. Building impactful digital products for Africa and beyond.",
    siteName: "David Briggs Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "David Briggs - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "David Briggs | Software Developer",
    description: "Building digital solutions from Abonnema, Nigeria.",
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
};

// JSON-LD structured data for Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Briggs",
  url: "https://david-briggs.vercel.app",
  image: "https://david-briggs.vercel.app/profile.jpg",
  jobTitle: "Software Developer",
  description:
    "Full-stack software developer from Abonnema, Rivers State, Nigeria",
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
    "https://www.instagram.com/davidbriggs001?igsh=MXN1cG13ZGY4dDc0ZA==",
    "https://www.facebook.com/profile.php?id=100089440026395"
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://david-briggs.vercel.app"/>
      </head>
      <body className="noise">
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
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
