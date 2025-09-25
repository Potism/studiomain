"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setSubmitted(true);
      console.log("Form submitted successfully:", result);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (submitted) {
    return (
      <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 bronze-glow">
              <Calendar className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Richiesta Inviata!
            </h3>
            <p className="text-muted-foreground">
              Grazie per aver scelto Perspective Studio. Ti contatteremo entro
              24 ore per confermare l'appuntamento.
            </p>
          </div>
          <Button
            onClick={() => {
              setSubmitted(false);
              setError(null);
              setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                service: "",
                budget: "",
                message: "",
                preferredDate: "",
                preferredTime: "",
              });
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90 bronze-glow"
          >
            Invia Nuova Richiesta
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Contact Form */}
      <div className="lg:col-span-2">
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Prenota la Tua Consulenza Gratuita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    Nome e Cognome *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground"
                    placeholder="Il tuo nome completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground"
                    placeholder="la-tua-email@esempio.com"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Telefono *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground"
                    placeholder="+39 123 456 7890"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Azienda/Brand
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground"
                    placeholder="Nome della tua azienda"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service" className="text-white">
                  Servizio di Interesse *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleInputChange("service", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Seleziona il servizio che ti interessa" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="social-ads">
                      Gestione Social & ADS
                    </SelectItem>
                    <SelectItem value="photo-video">
                      Produzione Foto & Video
                    </SelectItem>
                    <SelectItem value="wedding">Servizi Wedding</SelectItem>
                    <SelectItem value="complete">Pacchetto Completo</SelectItem>
                    <SelectItem value="consultation">
                      Solo Consulenza
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget" className="text-white">
                  Budget Mensile
                </Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleInputChange("budget", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Seleziona il tuo budget indicativo" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-white/20">
                    <SelectItem value="500-1000">€500 - €1.000</SelectItem>
                    <SelectItem value="1000-2500">€1.000 - €2.500</SelectItem>
                    <SelectItem value="2500-5000">€2.500 - €5.000</SelectItem>
                    <SelectItem value="5000+">€5.000+</SelectItem>
                    <SelectItem value="discuss">Da discutere</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferred Appointment Time */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate" className="text-white">
                    Data Preferita
                  </Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) =>
                      handleInputChange("preferredDate", e.target.value)
                    }
                    className="bg-white/10 border-white/20 text-white"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime" className="text-white">
                    Orario Preferito
                  </Label>
                  <Select
                    value={formData.preferredTime}
                    onValueChange={(value) =>
                      handleInputChange("preferredTime", value)
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Seleziona orario" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      <SelectItem value="morning">
                        Mattina (9:00 - 12:00)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        Pomeriggio (14:00 - 17:00)
                      </SelectItem>
                      <SelectItem value="evening">
                        Sera (18:00 - 20:00)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Messaggio
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-muted-foreground min-h-[100px]"
                  placeholder="Raccontaci del tuo progetto, obiettivi e qualsiasi dettaglio che ritieni importante..."
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 bronze-glow disabled:opacity-50"
              >
                {isSubmitting
                  ? "Invio in corso..."
                  : "Prenota Consulenza Gratuita"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Info & Quick Actions */}
      <div className="space-y-6">
        {/* Contact Info */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Contatti Diretti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm">d.perspectivestudio@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <Instagram className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-sm">@d.perspective.studio</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Sede</p>
                <p className="text-sm">Italia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Response Times */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Tempi di Risposta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-foreground">Consulenza Gratuita</span>
              <Badge className="bg-primary/20 text-primary">24h</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Preventivo Dettagliato</span>
              <Badge className="bg-primary/20 text-primary">48h</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground">Inizio Progetto</span>
              <Badge className="bg-primary/20 text-primary">1 settimana</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card className="liquid-glass border border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Perché Sceglierci</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground">
            <p>✨ Esperienza comprovata nel settore</p>
            <p>📱 Approccio personalizzato per ogni cliente</p>
            <p>🎯 Risultati misurabili e concreti</p>
            <p>🚀 Supporto completo dalla strategia alla realizzazione</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
