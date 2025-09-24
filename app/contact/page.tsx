import { SiteHeader } from "@/components/site-header"
import { ContactForm } from "@/components/contact-form"
import { AppverseFooter } from "@/components/appverse-footer"

export const metadata = {
  title: "Contatti | Perspective Studio - Consulenza Gratuita",
  description:
    "Contatta Perspective Studio per una consulenza gratuita. Prenota il tuo appuntamento e scopri come possiamo far crescere il tuo business online.",
}

export default function ContactPage() {
  return (
    <>
      <main className="min-h-[100dvh] text-white">
        <SiteHeader />
        <section className="container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">Iniziamo Insieme</h1>
              <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                Prenota la tua consulenza gratuita e scopri come possiamo trasformare la tua presenza digitale in
                risultati concreti.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
        <AppverseFooter />
      </main>
    </>
  )
}
