"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Briefcase,
  Camera,
  Phone,
  Info,
  Aperture,
} from "lucide-react";

export function SiteHeader() {
  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "#services", label: "Servizi", icon: Briefcase },
    { href: "/gallery", label: "Portfolio", icon: Camera },
    { href: "/contact", label: "Contatti", icon: Phone },
    { href: "/About", label: "Chi Siamo", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex h-16 items-center justify-between px-8 perspective-glass-header rounded-2xl">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Aperture className="h-8 w-8 text-primary group-hover:rotate-45 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight perspective-text">
                Perspective
              </span>
              <span className="text-xs text-muted-foreground tracking-widest uppercase">
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex">
            <Button
              asChild
              className="bg-white text-gray-700 font-semibold rounded-xl px-8 py-3
                         hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02]
                         transition-all duration-300 perspective-glow border border-gray-200"
            >
              <Link href="/contact">Iniziamo</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-border bg-card/80 text-foreground hover:bg-card rounded-xl"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="perspective-glass border-border p-0 w-72 flex flex-col"
              >
                <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
                  <Aperture className="h-8 w-8 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl tracking-tight perspective-text">
                      Perspective
                    </span>
                    <span className="text-xs text-muted-foreground tracking-widest uppercase">
                      Studio
                    </span>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2 mt-4 text-foreground">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-accent hover:text-primary transition-colors duration-300 group"
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors">
                        <l.icon className="h-5 w-5" />
                      </span>
                      <span className="font-medium">{l.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* CTA Button at Bottom */}
                <div className="mt-auto border-t border-border p-6">
                  <Button
                    asChild
                    className="w-full bg-white text-gray-700 font-semibold rounded-xl px-8 py-4
                               hover:bg-gray-50 hover:shadow-lg hover:scale-[1.02]
                               transition-all duration-300 perspective-glow border border-gray-200"
                  >
                    <Link href="/contact">Inizia il Tuo Progetto</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
