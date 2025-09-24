"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CheckCircle2, Instagram, Facebook, Camera, Heart } from "lucide-react";

type Feature = { text: string; muted?: boolean };

const ACCENT = "#FFFFFF";

function FeatureItem({ text, muted = false }: Feature) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4" style={{ color: ACCENT }} />
      <span
        className={`text-sm ${muted ? "text-neutral-500" : "text-neutral-200"}`}
      >
        {text}
      </span>
    </li>
  );
}

export function Pricing() {
  return (
    <section id="services-pricing" className="text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "rgba(198,255,58,0.12)", color: ACCENT }}
          >
            I Nostri Servizi
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            I Nostri Servizi Professionali
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400">
            Soluzioni creative personalizzate per far crescere il tuo brand
            online.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {/* Social Media Management */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-white" />
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                Gestione Social & ADS
              </div>
              <div className="text-neutral-300 text-sm">
                Aumenta la tua visibilità online con contenuti che convertono
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/contact">Richiedi Info</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2">
                {[
                  "Piano editoriale personalizzato",
                  "Copywriting professionale",
                  "Gestione community",
                  "Campagne pubblicitarie mirate",
                  "Report mensili dettagliati",
                  "Analisi competitor",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Photo & Video Production */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                Produzione Foto & Video
              </div>
              <div className="text-neutral-300 text-sm">
                Contenuti visivi professionali per ogni piattaforma
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/contact">Richiedi Info</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2">
                {[
                  "Shooting fotografici professionali",
                  "Reel commerciali per social",
                  "Editing avanzato",
                  "Contenuti ottimizzati per ogni piattaforma",
                  "Storytelling visivo",
                  "Direzione creativa",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Wedding Services */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass-enhanced shadow-[0_16px_50px_rgba(0,0,0,0.4)] transition-all duration-300">
            <CardHeader className="relative space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                Servizi Wedding
              </div>
              <div className="text-neutral-300 text-sm">
                Catturiamo i momenti più speciali della vostra vita
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/contact">Richiedi Info</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="relative pt-0">
              <ul className="grid gap-2">
                {[
                  "Fotografia matrimoniale completa",
                  "Video emozionali e cinematografici",
                  "Reportage dell'intera giornata",
                  "Album personalizzati di lusso",
                  "Servizio pre e post matrimonio",
                  "Consegna digitale e fisica",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>

          {/* Studio Fotografico */}
          <Card className="relative overflow-hidden rounded-2xl liquid-glass shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300">
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-white" />
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                Studio Fotografico
              </div>
              <div className="text-neutral-300 text-sm">
                Servizi professionali in studio per prodotti e ritratti
              </div>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 rounded-full px-4 py-2 text-sm font-medium text-black shadow transition-[box-shadow,transform,filter] active:translate-y-[1px]"
                  style={{ backgroundColor: ACCENT }}
                >
                  <Link href="/contact">Richiedi Info</Link>
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <ul className="grid gap-2">
                {[
                  "Fotografia prodotti e-commerce",
                  "Ritratti professionali e headshot",
                  "Shooting commerciali in studio",
                  "Fotografia 360° per cataloghi",
                  "Video promozionali in studio",
                  "Set personalizzati e lighting design",
                ].map((f, i) => (
                  <FeatureItem key={i} text={f} />
                ))}
              </ul>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    </section>
  );
}
