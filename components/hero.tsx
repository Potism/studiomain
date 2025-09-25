import { Button } from "@/components/ui/button";
import LazyVideo from "./lazy-video";
import { Aperture, Camera, Video, Zap } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const buttonNew = (
    <Button
      asChild
      className="rounded-2xl bg-white text-gray-700 px-8 py-4 hover:bg-gray-50 perspective-glow font-semibold text-lg border border-gray-200 hover:shadow-lg"
    >
      <Link href="/contact">
        Inizia il Tuo Progetto
      </Link>
    </Button>
  );

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-black via-neutral-900 to-black">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-black" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C6FF3A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#C6FF3A]/3 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#C6FF3A]/3 via-transparent to-transparent opacity-20" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 sm:py-28">
          <div className="mb-8 flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
            <div className="flex items-center gap-2">
              <Aperture className="h-5 w-5 text-[#C6FF3A] animate-pulse" />
              <Camera className="h-4 w-4 text-neutral-400" />
              <Video className="h-4 w-4 text-neutral-400" />
            </div>
            <div className="w-px h-4 bg-white/20" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white">
              Perspective Studio
            </p>
          </div>

          <h1 className="mt-6 text-center text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block text-balance text-white">VISUAL</span>
            <span className="block perspective-text perspective-glow text-[#C6FF3A]">
              STORYTELLING
            </span>
            <span className="block text-balance text-white">CHE CONVERTE</span>
          </h1>

          <p className="mt-8 text-center text-xl text-neutral-300 max-w-3xl text-balance leading-relaxed">
            Fotografia e videografia professionale che cattura l'essenza del tuo
            brand e genera un coinvolgimento significativo su tutte le
            piattaforme.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center">
            {buttonNew}
            <Button
              asChild
              variant="outline"
              className="rounded-2xl px-8 py-4 font-semibold text-lg border-2 border-white/20 hover:bg-white/5 bg-white/5 backdrop-blur-sm text-white hover:border-[#C6FF3A]/50"
            >
              <Link href="/gallery">
                Visualizza Portfolio
              </Link>
            </Button>
          </div>

          <div className="mt-16 grid w-full gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            {phoneData.map((p, i) => {
              const visibility =
                i <= 2
                  ? "block"
                  : i === 3
                  ? "hidden md:block"
                  : i === 4
                  ? "hidden xl:block"
                  : "hidden";

              return (
                <div
                  key={i}
                  className={`${visibility} animate-fade-in-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <PhoneCard
                    title={p.title}
                    sub={p.sub}
                    tone={p.tone}
                    gradient={p.gradient}
                    videoSrc={p.videoSrc}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
            {[
              { number: "500+", label: "Progetti Completati", icon: Camera },
              { number: "98%", label: "Clienti Soddisfatti", icon: Zap },
              {
                number: "50M+",
                label: "Visualizzazioni Generate",
                icon: Video,
              },
              {
                number: "24h",
                label: "Tempo di Risposta Medio",
                icon: Aperture,
              },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
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
        </div>
      </div>
    </section>
  );
}

function PhoneCard({
  title = "8°",
  sub = "Clear night. Great for render farm runs.",
  tone = "calm",
  gradient = "from-[#0f172a] via-[#14532d] to-[#052e16]",
  videoSrc,
}: {
  title?: string;
  sub?: string;
  tone?: string;
  gradient?: string;
  videoSrc?: string;
}) {
  return (
    <div className="relative rounded-3xl glass-border-enhanced bg-card p-3 group hover:scale-[1.02] transition-all duration-500">
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-2xl bg-black">
        <LazyVideo
          src={
            videoSrc ??
            "https://ytvukganje01dfq5.public.blob.vercel-storage.com/portfolio/commercial-video/Abz-0K9E-8nqxRSHXBXHo.mov"
          }
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
          autoplay={true}
          loop={true}
          muted={true}
          playsInline={true}
          aria-label={`${title} - ${sub}`}
        />

        <div className="relative z-10 p-4">
          <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/30" />
          <div className="space-y-2 px-2">
            <div className="text-3xl font-bold leading-snug text-white/95">
              {title}
            </div>
            <p className="text-sm text-white/80 leading-relaxed">{sub}</p>
            <div className="mt-4 inline-flex items-center rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wider text-white/90 font-medium">
              {tone === "calm" ? "perspective studio" : tone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const phoneData = [
  {
    title: "Brand",
    sub: "Identità visiva che si distingue.",
    tone: "branding",
    gradient: "from-[#0b0b0b] via-[#0f172a] to-[#020617]",
    videoSrc:
      "https://ytvukganje01dfq5.public.blob.vercel-storage.com/portfolio/commercial-video/PJV9vss_1DkHsBe_InRdJ.mov",
  },
  {
    title: "Studio",
    sub: "Dal concept al contenuto: studio moda e prodotto.",
    tone: "risultati",
    gradient: "from-[#0b1a0b] via-[#052e16] to-[#022c22]",
  },
  {
    title: "Social",
    sub: "Ottimizzato per Instagram, TikTok e altro.",
    tone: "social",
    gradient: "from-[#001028] via-[#0b355e] to-[#052e5e]",
    videoSrc:
      "https://ytvukganje01dfq5.public.blob.vercel-storage.com/portfolio/creative-content/KpmlMQy0yM2W-JKU-SmSH.mov",
  },
  {
    title: "Eventi",
    sub: "Momenti speciali catturati per sempre.",
    tone: "eventi",
    gradient: "from-[#0b0b0b] via-[#1f2937] to-[#0b1220]",
    videoSrc:
      "https://ytvukganje01dfq5.public.blob.vercel-storage.com/portfolio/creative-content/CPwLLgX18iXlKOvIhTggG.mov",
  },
];
