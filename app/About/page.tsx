import React from "react";
import { SiteHeader } from "@/components/site-header";
import { AppverseFooter } from "@/components/appverse-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import {
  Camera,
  Video,
  Users,
  Award,
  Zap,
  Heart,
  Globe,
  Star,
  CheckCircle2,
  Aperture,
  Instagram,
  Target,
} from "lucide-react";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Chi Siamo | Perspective Studio - Fotografia e Videografia Professionale",
  description:
    "Scopri la storia di Perspective Studio, team di creativi specializzati in fotografia, videografia e social media marketing. La nostra missione è trasformare la tua visione in contenuti visivi straordinari.",
  keywords:
    "Perspective Studio, chi siamo, fotografia professionale, videografia, social media marketing, team creativo, Italia",
  openGraph: {
    title: "Chi Siamo | Perspective Studio",
    description:
      "Scopri la storia di Perspective Studio, team di creativi specializzati in fotografia, videografia e social media marketing.",
    type: "website",
    url: "https://perspectivestudio.it/About",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chi Siamo | Perspective Studio",
    description:
      "Scopri la storia di Perspective Studio, team di creativi specializzati in fotografia, videografia e social media marketing.",
  },
};

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Perspective Studio",
    url: "https://perspectivestudio.it",
    logo: "https://perspectivestudio.it/icons/perspective-white.svg",
    description:
      "Perspective Studio è un'agenzia di fotografia e videografia professionale specializzata in contenuti digitali e social media marketing.",
    sameAs: ["https://instagram.com/d.perspective.studio"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IT",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "d.perspectivestudio@gmail.com",
        contactType: "customer service",
      },
    ],
    areaServed: [
      { "@type": "Place", name: "Italy" },
      { "@type": "Place", name: "Europe" },
    ],
    serviceType: [
      "Photography Services",
      "Videography Services",
      "Social Media Management",
      "Content Creation",
      "Wedding Photography",
      "Event Photography",
      "Product Photography",
      "Digital Marketing",
    ],
  };

  const teamStats = [
    { icon: Camera, number: "500+", label: "Progetti Completati" },
    { icon: Users, number: "98%", label: "Clienti Soddisfatti" },
    { icon: Zap, number: "24h", label: "Tempo di Risposta Medio" },
  ];

  const services = [
    {
      icon: Instagram,
      title: "Social Media Management",
      description:
        "Gestione completa dei tuoi canali social con contenuti che convertono",
      features: [
        "Piano editoriale personalizzato",
        "Copywriting professionale",
        "Community management",
        "Campagne pubblicitarie mirate",
      ],
    },
    {
      icon: Camera,
      title: "Fotografia Professionale",
      description: "Servizi fotografici di alta qualità per ogni esigenza",
      features: [
        "Shooting prodotti",
        "Ritratti professionali",
        "Fotografia aziendale",
        "Servizi in studio",
      ],
    },
    {
      icon: Video,
      title: "Produzione Video",
      description: "Video commerciali che raccontano la tua storia",
      features: [
        "Video commerciali",
        "Reel per social",
        "Editing avanzato",
        "Contenuti ottimizzati",
      ],
    },
    {
      icon: Heart,
      title: "Servizi Wedding",
      description: "Catturiamo i momenti più speciali della vostra vita",
      features: [
        "Fotografia matrimoniale",
        "Video di matrimonio",
        "Album personalizzati",
        "Servizio completo",
      ],
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Precisione",
      description:
        "Ogni dettaglio conta. Lavoriamo con la massima attenzione per garantire risultati perfetti.",
    },
    {
      icon: Aperture,
      title: "Creatività",
      description:
        "Trasformiamo le idee in contenuti visivi unici che distinguono il tuo brand.",
    },
    {
      icon: Zap,
      title: "Efficienza",
      description:
        "Processi ottimizzati per consegnare i progetti nei tempi concordati.",
    },
    {
      icon: Globe,
      title: "Innovazione",
      description:
        "Utilizziamo le tecnologie più avanzate per creare contenuti all'avanguardia.",
    },
  ];

  return (
    <>
      {/* SEO Schema */}
      <Script
        id="about-structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData),
        }}
      />

      <main className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C6FF3A]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C6FF3A]/3 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF3A]/3 via-transparent to-transparent opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 py-20 sm:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 w-fit mx-auto">
                <Aperture className="h-5 w-5 text-[#C6FF3A] animate-pulse" />
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
                  Chi Siamo
                </p>
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-8">
                <span className="block text-white">La Nostra</span>
                <span className="block perspective-text perspective-glow text-[#C6FF3A]">
                  STORIA
                </span>
              </h1>

              <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Siamo{" "}
                <strong className="text-[#C6FF3A]">Perspective Studio</strong>,
                un team di creativi specializzati in fotografia, videografia e
                social media marketing. La nostra missione è trasformare la tua
                visione in contenuti visivi straordinari che raccontano la tua
                storia e coinvolgono il tuo pubblico.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <Button
                  asChild
                  className="rounded-2xl bg-[#C6FF3A] text-black px-8 py-4 hover:bg-[#C6FF3A]/90 perspective-glow font-semibold text-lg"
                >
                  <Link href="/contact">Inizia il Tuo Progetto</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-2xl px-8 py-4 font-semibold text-lg border-2 border-white/20 hover:bg-white/5 bg-white/5 backdrop-blur-sm text-white hover:border-[#C6FF3A]/50"
                >
                  <Link href="/gallery">Guarda i Nostri Lavori</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-4 group-hover:bg-[#C6FF3A]/10 transition-colors">
                  <stat.icon className="h-6 w-6 text-[#C6FF3A]" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Services */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">
              I Nostri Servizi
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Offriamo soluzioni complete per tutte le tue esigenze creative e
              di marketing
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <Card
                key={index}
                className="glass-border-enhanced bg-white/5 border border-white/10 rounded-2xl group hover:scale-[1.02] hover:bg-white/10 transition-all duration-500"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-[#C6FF3A]/10 group-hover:bg-[#C6FF3A]/20 transition-colors duration-300">
                      <service.icon className="h-6 w-6 text-[#C6FF3A] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-2xl text-white font-serif">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-sm mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#C6FF3A] flex-shrink-0" />
                        <span className="text-sm text-neutral-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Our Values */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">
              I Nostri Valori
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Questi principi guidano ogni nostro progetto e definiscono il
              nostro approccio al lavoro
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-6 group-hover:bg-[#C6FF3A]/10 transition-colors duration-300">
                  <value.icon className="h-8 w-8 text-[#C6FF3A] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="font-bold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Process */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">
              Il Nostro Processo
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              Un approccio strutturato per garantire risultati eccellenti
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Scoperta",
                description:
                  "Ascoltiamo le tue esigenze, analizziamo il tuo brand e definiamo insieme gli obiettivi del progetto.",
              },
              {
                step: "02",
                title: "Strategia",
                description:
                  "Sviluppiamo una strategia creativa personalizzata e presentiamo le nostre proposte innovative.",
              },
              {
                step: "03",
                title: "Realizzazione",
                description:
                  "Mettiamo in pratica la strategia, creiamo i contenuti e ti accompagniamo verso il successo.",
              },
            ].map((process, index) => (
              <div key={index} className="relative group">
                <div className="glass-border-enhanced bg-white/5 border border-white/10 rounded-2xl p-8 group-hover:bg-white/10 transition-all duration-500">
                  <div className="text-5xl font-bold text-[#C6FF3A]/20 mb-4">
                    {process.step}
                  </div>
                  <h3 className="font-bold text-2xl text-white mb-4">
                    {process.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {process.description}
                  </p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#C6FF3A]/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">
              Perché Scegliere Perspective Studio
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Star,
                title: "Esperienza Comprovata",
                description:
                  "Oltre 500 progetti completati con successo per clienti di ogni settore",
              },
              {
                icon: Zap,
                title: "Tempi Rapidi",
                description:
                  "Consegniamo i progetti nei tempi concordati senza compromettere la qualità",
              },
              {
                icon: Heart,
                title: "Passione Autentica",
                description:
                  "Amiamo quello che facciamo e si vede in ogni nostro lavoro",
              },
              {
                icon: Users,
                title: "Team Dedicato",
                description:
                  "Professionisti esperti pronti a trasformare le tue idee in realtà",
              },
              {
                icon: Target,
                title: "Risultati Misurabili",
                description:
                  "Ogni progetto è orientato a raggiungere obiettivi concreti e misurabili",
              },
              {
                icon: Globe,
                title: "Approccio Moderno",
                description:
                  "Utilizziamo le tecnologie e le tendenze più attuali del settore",
              },
            ].map((reason, index) => (
              <div
                key={index}
                className="glass-border-enhanced bg-white/5 border border-white/10 rounded-2xl p-6 group hover:bg-white/10 transition-all duration-500"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-[#C6FF3A]/10 group-hover:bg-[#C6FF3A]/20 transition-colors duration-300 flex-shrink-0">
                    <reason.icon className="h-6 w-6 text-[#C6FF3A]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Pronto a Far Crescere il Tuo Business?
              </h2>
              <p className="text-muted-foreground mb-6">
                Contattaci per una consulenza gratuita e scopri come possiamo
                aiutarti.
              </p>
            </div>
            <div className="flex justify-center">
              <Button
                asChild
                className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground bronze-glow hover:bg-primary/90"
              >
                <Link href="/contact">Consulenza Gratuita</Link>
              </Button>
            </div>
          </div>
        </section>

        <AppverseFooter />
      </main>
    </>
  );
}
