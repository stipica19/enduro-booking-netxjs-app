import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Roboto } from "next/font/google";
import Script from "next/script";
import type { Metadata, Viewport } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const SITE_TITLE =
  "Enduro Touren in Bosnien - Abenteuer Enduro Urlaub & Motorradreisen";
const SITE_DESCRIPTION =
  "Erleben Sie unvergessliche Enduro Touren in Bosnien! Geführte Motorradreisen durch die wunderschönen Berge der Balkanhalbinsel. Jetzt buchen!";
const SITE_IMAGE =
  "https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0";

// Zadane vrijednosti za cijelu stranicu – svaka stranica ih moze pregaziti svojim
// generateMetadata. Canonical i og:url se NE postavljaju ovdje, nego po stranici,
// inace svaka stranica dobije dva canonicala (npr. "/" i "/de").
export const metadata: Metadata = {
  metadataBase: new URL("https://endurodriftbosnien.com"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords:
    "enduro tours bosnien, motorradreisen balkan, enduro touren, abenteuer motorrad, bosnia enduro, geführte motorradtouren, offroad bosnien",
  authors: [{ name: "Enduro Drift Bosnien" }],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [{ url: "/logo.png", sizes: "32x32" }],
    apple: "/logo.png",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: "Enduro Drift Bosnien",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "de_DE",
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Enduro Tours in den Bergen von Bosnien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  other: {
    "geo.region": "BA",
    "geo.country": "Bosnia and Herzegovina",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html suppressHydrationWarning lang="de">
      <head>
        {/* Meta tagovi (title, description, canonical, og:*, twitter:*) dolaze iz
            metadata exporta – ovdje ostaju samo stvari koje metadata ne pokriva */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <GoogleAnalytics />
        <Script
          id="ms-clarity"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
                (function(c,l,a,r,i,t,y){
                    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${clarityId}");
              `,
          }}
        />
      </head>
      <body className={`${roboto.className} bg-white text-black`} lang="de">
        {children}
      </body>
    </html>
  );
}
