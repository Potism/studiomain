"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

interface FooterContent {
  tagline: string;
  copyright: string;
}

const defaultContent: FooterContent = {
  tagline:
    "Specialisti in contenuti digitali e social media marketing. Trasformiamo la tua visione in risultati concreti.",
  copyright: "© 2025 — Perspective Studio",
};

export function AppverseFooter() {
  const [content, setContent] = useState<FooterContent>(defaultContent);

  useEffect(() => {
    // Load content from localStorage
    const savedContent = localStorage.getItem("perspective-studio-content");
    if (savedContent) {
      try {
        const parsed = JSON.parse(savedContent);
        if (parsed.footer) {
          setContent(parsed.footer);
        }
      } catch (error) {
        console.error("Error parsing saved content:", error);
      }
    }
  }, []);

  return (
    <section className="text-white" id="contact">
      {/* Footer */}
      <footer className="border-t border-border pb-20 md:pb-10">
        <div className="container mx-auto px-4 py-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Image
                  src="/icons/skitbit-white.svg"
                  alt="Perspective Studio logo"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="text-xl font-semibold text-white">
                  Perspective Studio
                </span>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                {content.tagline}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com/d.perspective.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Seguici su Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-2">
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Navigazione
                </h5>
                <ul className="space-y-2 text-sm text-foreground">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Servizi", href: "#services" },
                    { label: "Gallery", href: "/gallery" },
                    { label: "Contatti", href: "/contact" },
                    { label: "Chi Siamo", href: "#about" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Servizi
                </h5>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>Social Media Management</li>
                  <li>Produzione Foto & Video</li>
                  <li>Servizi Wedding</li>
                  <li>Campagne Pubblicitarie</li>
                  <li>Consulenza Strategica</li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contatti
              </h5>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>info@perspectivestudio.it</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+39 123 456 7890</span>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-muted-foreground" />
                  <span>@d.perspective.studio</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Italia</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>{content.copyright}</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary transition-colors"
              >
                Termini e Condizioni
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
