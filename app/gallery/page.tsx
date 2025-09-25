import { SiteHeader } from "@/components/site-header"
import { GalleryGrid } from "@/components/gallery-grid"
import { AppverseFooter } from "@/components/appverse-footer"
import type { Metadata } from "next"

export const dynamic = "force-static"

export const metadata: Metadata = {
  title: "Gallery | Perspective Studio - I Nostri Lavori",
  description:
    "Scopri i nostri progetti di social media marketing, fotografia e video. Portfolio completo dei lavori realizzati per i nostri clienti.",
  keywords: "portfolio, fotografia, videografia, progetti, social media, marketing",
  openGraph: {
    title: "Gallery | Perspective Studio - I Nostri Lavori",
    description: "Scopri i nostri progetti di social media marketing, fotografia e video.",
    type: "website",
    url: "https://perspectivestudio.it/gallery",
    images: [
      {
        url: "/gallery-og.jpg",
        width: 1200,
        height: 630,
        alt: "Perspective Studio Portfolio Gallery",
      },
    ],
  },
  alternates: {
    canonical: "https://perspectivestudio.it/gallery",
  },
}

export default function GalleryPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">La Nostra Gallery</h1>
            <p className="text-neutral-400 text-lg">
              Esplora i nostri progetti e lasciati ispirare dai risultati che abbiamo ottenuto per i nostri clienti.
            </p>
          </div>
          <GalleryGrid />
        </section>
        <AppverseFooter />
      </main>
    </>
  )
}
