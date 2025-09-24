"use client";

import { useEffect, useState } from "react";
import { Camera, Megaphone, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FeaturesContent {
  title: string;
  subtitle: string;
}

const defaultContent: FeaturesContent = {
  title: "Perché Scegliere Perspective Studio.",
  subtitle: "Scopri il nostro approccio unico al visual storytelling",
};

export function Features() {
  const [content, setContent] = useState<FeaturesContent>(defaultContent);

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("perspective-studio-content");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.features) {
          setContent(parsed.features);
        }
      } catch (error) {
        console.error("Error parsing saved content:", error);
      }
    }
  }, []);

  return (
    <section id="services" className="container mx-auto px-4 py-16 sm:py-20">
      <div className="text-center mb-16">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl font-serif">
          {content.title}
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-[#C6FF3A]/10 group-hover:bg-[#C6FF3A]/20 transition-colors duration-300">
                <Megaphone className="h-6 w-6 text-[#C6FF3A] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <p className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
                Social & Marketing
              </p>
            </div>
            <CardTitle className="text-2xl text-white font-serif">
              Gestione Social Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-white">
              {[
                "Piano editoriale personalizzato",
                "Copywriting professionale",
                "Gestione community",
                "Campagne pubblicitarie mirate",
                "Report mensili dettagliati",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${0.3 + i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF3A] mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Camera className="h-6 w-6 text-primary group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
              <p className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
                Contenuti Visivi
              </p>
            </div>
            <CardTitle className="text-2xl text-white font-serif">
              Fotografia & Video
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-white">
              {[
                "Shooting fotografici professionali",
                "Contenuti video commerciali",
                "Editing avanzato e post-produzione",
                "Contenuti ottimizzati per piattaforma",
                "Visual storytelling",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${0.4 + i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Heart className="h-6 w-6 text-primary group-hover:scale-110 group-hover:pulse transition-transform duration-300" />
              </div>
              <p className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
                Eventi Speciali
              </p>
            </div>
            <CardTitle className="text-2xl text-white font-serif">
              Fotografia Eventi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-white">
              {[
                "Fotografia matrimoniale",
                "Eventi aziendali",
                "Copertura completa dell'evento",
                "Album fotografici personalizzati",
                "Momenti indimenticabili",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${0.5 + i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:scale-[1.02] hover:bg-white/10 transition-all duration-500 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <Camera className="h-6 w-6 text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
              </div>
              <p className="text-xs tracking-widest text-neutral-400 uppercase font-medium">
                Servizi Studio
              </p>
            </div>
            <CardTitle className="text-2xl text-white font-serif">
              Studio Fotografico
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-white">
              {[
                "Fotografia prodotti professionale",
                "Sessioni ritratti e headshot",
                "Shooting commerciali in studio",
                "Visualizzazione prodotti 360°",
                "Produzione video in studio",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 opacity-0 animate-fade-in-up"
                  style={{
                    animationDelay: `${0.6 + i * 0.1}s`,
                    animationFillMode: "forwards",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed text-neutral-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
