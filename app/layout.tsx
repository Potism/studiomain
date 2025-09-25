import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import Script from "next/script"
import PlasmaWrapper from "@/components/plasma-wrapper"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://perspectivestudio.it'),
  title: {
    default: "Perspective Studio | Professional Photography & Videography",
    template: "%s | Perspective Studio"
  },
  description:
    "Perspective Studio specializes in professional photography and videography services. We create compelling visual content that tells your story and drives engagement across all platforms.",
  keywords: [
    "fotografia professionale",
    "videografia",
    "social media marketing", 
    "contenuti visivi",
    "branding",
    "Italia",
    "Perspective Studio",
    "video commerciali",
    "shooting fotografici"
  ],
  authors: [{ name: "Perspective Studio" }],
  creator: "Perspective Studio",
  publisher: "Perspective Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://perspectivestudio.it',
    siteName: 'Perspective Studio',
    title: 'Perspective Studio | Professional Photography & Videography',
    description: 'Professional photography and videography services in Italy. Creating compelling visual content for brands and businesses.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Perspective Studio - Professional Photography & Videography',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perspective Studio | Professional Photography & Videography',
    description: 'Professional photography and videography services in Italy.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable} antialiased dark`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://perspectivestudio.it" />
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/fonts/PlayfairDisplay.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          fetchPriority="high"
        />

        {/* Dynamic Favicon Script */}
        <Script id="dynamic-favicon" strategy="beforeInteractive">
          {`
            function updateFavicon() {
              const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const faviconHref = darkMode ? '/icons/perspective-white.svg' : '/icons/favicon-dark.svg';
              let link = document.querySelector("link[rel~='icon']");
              if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              link.href = faviconHref;
            }
            updateFavicon();
            // Listen for changes in theme
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
          `}
        </Script>

        {/* Google Tag Manager (deferred) */}
        <Script id="gtm-script" strategy="lazyOnload">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NFLHXXGK');`}
        </Script>

        {/* Google Analytics (deferred) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-W6LV22900R" strategy="lazyOnload" />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6LV22900R');
          `}
        </Script>
      </head>
      <body className="font-sans bg-black">
        <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-neutral-900 to-black">
          <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF3A]/5 via-transparent to-transparent" />
          <PlasmaWrapper
            color="#C6FF3A"
            speed={0.3}
            direction="forward"
            scale={1.5}
            opacity={0.05}
            mouseInteractive={false}
          />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
