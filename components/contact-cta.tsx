import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ContactCTA() {
  return (
    <section className="text-white py-16 sm:py-20" id="contact-cta">
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
  );
}
