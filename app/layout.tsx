import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { Roboto } from "next/font/google";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://endurodriftbosnien.com"),
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Primary Meta Tags */}
        <title>
          Enduro Touren in Bosnien - Abenteuer Enduro Urlaub & Motorradreisen
        </title>
        <meta
          name="title"
          content="Enduro Tours Bosnien | Abenteuer Enduro Touren & Motorradreisen"
        />
        <meta
          name="description"
          content="Erleben Sie unvergessliche Enduro Touren in Bosnien! Geführte Motorradreisen durch die wunderschönen Berge der Balkanhalbinsel. Jetzt buchen!"
        />
        <meta
          name="keywords"
          content="enduro tours bosnien, motorradreisen balkan, enduro touren, abenteuer motorrad, bosnia enduro, geführte motorradtouren, offroad bosnien"
        />
        <meta name="author" content="Enduro Drift Bosnien" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="language" content="de" />
        <meta name="geo.region" content="BA" />
        <meta name="geo.country" content="Bosnia and Herzegovina" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://endurodriftbosnien.com" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#000000" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Enduro Drift Bosnien" />
        <meta
          property="og:title"
          content="Enduro Tours Bosnien | Abenteuer Enduro Touren & Motorradreisen"
        />
        <meta
          property="og:description"
          content="Erleben Sie unvergessliche Enduro Touren in Bosnien! Geführte Motorradreisen durch die wunderschönen Berge der Balkanhalbinsel. Jetzt buchen!"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="Enduro Tours in den Bergen von Bosnien"
        />
        <meta property="og:url" content="https://endurodriftbosnien.com" />
        <meta property="og:locale" content="de_DE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Enduro Tours Bosnien | Abenteuer Enduro Touren & Motorradreisen"
        />
        <meta
          name="twitter:description"
          content="Erleben Sie unvergessliche Enduro Touren in Bosnien! Geführte Motorradreisen durch die wunderschönen Berge der Balkanhalbinsel."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/stipica/image/upload/c_limit,w_2048/f_auto/q_auto/v1/Your_paragraph_text_1_jabt8n?_a=BAVAZGBz0"
        />
        <meta
          name="twitter:image:alt"
          content="Enduro Tours in den Bergen von Bosnien"
        />

        {/* Additional SEO */}
        <meta name="format-detection" content="telephone=no" />
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
