import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { ContactCTA } from "@/components/contact-cta";
import { AppverseFooter } from "@/components/appverse-footer";
import Script from "next/script";
import { Metadata } from "next";

// ✅ Force static generation for low TTFB
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Perspective Studio | Fotografia e Videografia Professionale",
  description:
    "Fotografia e videografia professionale che cattura l'essenza del tuo brand e genera un coinvolgimento significativo su tutte le piattaforme. Specialisti in social media marketing e contenuti visivi.",
  keywords:
    "fotografia professionale, videografia, social media marketing, contenuti visivi, branding, Italia, Perspective Studio",
  openGraph: {
    title: "Perspective Studio | Fotografia e Videografia Professionale",
    description:
      "Fotografia e videografia professionale che cattura l'essenza del tuo brand e genera un coinvolgimento significativo su tutte le piattaforme.",
    type: "website",
    url: "https://perspectivestudio.it",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perspective Studio | Fotografia e Videografia Professionale",
    description:
      "Fotografia e videografia professionale che cattura l'essenza del tuo brand e genera un coinvolgimento significativo su tutte le piattaforme.",
  },
};

export default function Page() {
  // Structured data for pricing
  const pricingStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "@id": "https://perspectivestudio.it/#pricing",
    name: "Servizi di Marketing",
    description:
      "Servizi di social media marketing, gestione contenuti e produzione foto/video per aziende e professionisti",
    url: "https://perspectivestudio.it/#pricing",
    mainEntity: {
      "@type": "PriceSpecification",
      name: "Servizi Digital Marketing",
      description:
        "Servizi professionali di social media marketing e produzione contenuti",
      offers: [
        {
          "@type": "Offer",
          name: "Gestione Social & ADS",
          description:
            "Piano editoriale, copywriting, gestione community e campagne pubblicitarie",
        },
        {
          "@type": "Offer",
          name: "Produzione Foto & Video",
          description:
            "Shooting fotografici, reel commerciali, editing avanzato",
        },
        {
          "@type": "Offer",
          name: "Servizi Wedding",
          description:
            "Servizi fotografici e video per matrimoni ed eventi speciali",
        },
      ],
    },
  };

  // Structured data for main page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://perspectivestudio.it/",
    name: "Perspective Studio | Contenuti Digitali e Social Media Marketing",
    description:
      "Siamo Perspective Studio, specialisti in contenuti digitali e social media marketing. Aiutiamo aziende e professionisti ad aumentare la visibilità online.",
    url: "https://perspectivestudio.it/",
    mainEntity: {
      "@type": "Organization",
      name: "Perspective Studio",
      url: "https://perspectivestudio.it",
      sameAs: ["https://instagram.com/d.perspective.studio"],
    },
    hasPart: [
      {
        "@type": "WebPageElement",
        "@id": "https://perspectivestudio.it/#services",
        name: "Servizi Section",
        url: "https://perspectivestudio.it/#services",
      },
    ],
  };

  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <Hero />
        <Features />
        <Pricing />
        <ContactCTA />
        <AppverseFooter />
      </main>

      {/* JSON-LD structured data */}
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />

      <Script
        id="page-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData),
        }}
      />
    </>
  );
}
