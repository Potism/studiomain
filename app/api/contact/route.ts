import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData = await request.json();

    // Validate required fields
    const { name, email, phone, service } = formData;

    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, email, phone, and service are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create a comprehensive submission log
    const submission = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: formData.company?.trim() || null,
      service: service,
      budget: formData.budget || null,
      message: formData.message?.trim() || null,
      preferredDate: formData.preferredDate || null,
      preferredTime: formData.preferredTime || null,
    };

    // Log the submission (in a real app, you'd save to database or send email)
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log("Timestamp:", submission.timestamp);
    console.log("Name:", submission.name);
    console.log("Email:", submission.email);
    console.log("Phone:", submission.phone);
    if (submission.company) console.log("Company:", submission.company);
    console.log("Service:", submission.service);
    if (submission.budget) console.log("Budget:", submission.budget);
    if (submission.preferredDate)
      console.log("Preferred Date:", submission.preferredDate);
    if (submission.preferredTime)
      console.log("Preferred Time:", submission.preferredTime);
    if (submission.message) console.log("Message:", submission.message);
    console.log("=====================================");

    // Send email notifications
    await sendEmailNotifications(submission);

    return NextResponse.json(
      {
        success: true,
        message:
          "Contact form submitted successfully. You will receive a response within 24 hours.",
        timestamp: submission.timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle GET requests for debugging
export async function GET() {
  return NextResponse.json(
    { message: "Contact API is working" },
    { status: 200 }
  );
}

// Email notification function
async function sendEmailNotifications(submission: any) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail =
    process.env.CONTACT_EMAIL || "d.perspectivestudio@gmail.com";
  const fromEmail = process.env.FROM_EMAIL || "noreply@perspectivestudio.it";

  if (!resendApiKey) {
    console.log("⚠️  RESEND_API_KEY not found. Skipping email notifications.");
    console.log("📧 Emails would have been sent to:", contactEmail);
    return;
  }

  const resend = new Resend(resendApiKey);

  try {
    console.log("📧 Sending emails...");
    console.log("From:", fromEmail);
    console.log("To business:", contactEmail);
    console.log("To client:", submission.email);

    // 1. Send notification email to business
    const businessEmail = await resend.emails.send({
      from: `Perspective Studio <${fromEmail}>`,
      to: [contactEmail],
      subject: `🔔 Nuova Richiesta di Contatto - ${submission.name}`,
      html: createBusinessNotificationEmail(submission),
    });

    console.log("📊 Business email response:", businessEmail);
    console.log("✅ Business notification email sent:", businessEmail.data?.id);

    // 2. Send confirmation email to client
    const clientEmail = await resend.emails.send({
      from: `Perspective Studio <${fromEmail}>`,
      to: [submission.email],
      subject: "✅ Richiesta Ricevuta - Perspective Studio",
      html: createClientConfirmationEmail(submission),
    });

    console.log("📊 Client email response:", clientEmail);
    console.log("✅ Client confirmation email sent:", clientEmail.data?.id);
  } catch (error) {
    console.error("❌ Email sending error:", error);
    console.error("❌ Error details:", JSON.stringify(error, null, 2));
    // Don't throw error - we don't want to fail the form submission if email fails
  }
}

// Business notification email template
function createBusinessNotificationEmail(submission: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nuova Richiesta di Contatto</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { background: white; padding: 10px; border-left: 4px solid #007bff; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nuova Richiesta di Contatto</h1>
          <p>Perspective Studio</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">👤 Nome:</div>
            <div class="value">${submission.name}</div>
          </div>
          
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${submission.email}">${
    submission.email
  }</a></div>
          </div>
          
          <div class="field">
            <div class="label">📱 Telefono:</div>
            <div class="value"><a href="tel:${submission.phone}">${
    submission.phone
  }</a></div>
          </div>
          
          ${
            submission.company
              ? `
          <div class="field">
            <div class="label">🏢 Azienda:</div>
            <div class="value">${submission.company}</div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="label">🎯 Servizio:</div>
            <div class="value">${getServiceLabel(submission.service)}</div>
          </div>
          
          ${
            submission.budget
              ? `
          <div class="field">
            <div class="label">💰 Budget:</div>
            <div class="value">${getBudgetLabel(submission.budget)}</div>
          </div>
          `
              : ""
          }
          
          ${
            submission.preferredDate
              ? `
          <div class="field">
            <div class="label">📅 Data Preferita:</div>
            <div class="value">${new Date(
              submission.preferredDate
            ).toLocaleDateString("it-IT")}</div>
          </div>
          `
              : ""
          }
          
          ${
            submission.preferredTime
              ? `
          <div class="field">
            <div class="label">⏰ Orario Preferito:</div>
            <div class="value">${getTimeLabel(submission.preferredTime)}</div>
          </div>
          `
              : ""
          }
          
          ${
            submission.message
              ? `
          <div class="field">
            <div class="label">💬 Messaggio:</div>
            <div class="value">${submission.message}</div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="label">🕐 Data/Ora Invio:</div>
            <div class="value">${new Date(submission.timestamp).toLocaleString(
              "it-IT"
            )}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>Questa richiesta è stata inviata dal modulo di contatto di perspectivestudio.com</p>
          <p><strong>Rispondere entro 24 ore per garantire il miglior servizio</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Client confirmation email template
function createClientConfirmationEmail(submission: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Richiesta Ricevuta - Perspective Studio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .highlight { background: #e8f4fd; padding: 15px; border-left: 4px solid #007bff; margin: 20px 0; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Richiesta Ricevuta</h1>
          <p>Perspective Studio</p>
        </div>
        
        <div class="content">
          <p>Ciao <strong>${submission.name}</strong>,</p>
          
          <p>Grazie per aver scelto Perspective Studio! La tua richiesta è stata ricevuta con successo.</p>
          
          <div class="highlight">
            <h3>📋 Riassunto della tua richiesta:</h3>
            <p><strong>Servizio:</strong> ${getServiceLabel(
              submission.service
            )}</p>
            ${
              submission.budget
                ? `<p><strong>Budget:</strong> ${getBudgetLabel(
                    submission.budget
                  )}</p>`
                : ""
            }
            ${
              submission.preferredDate
                ? `<p><strong>Data preferita:</strong> ${new Date(
                    submission.preferredDate
                  ).toLocaleDateString("it-IT")}</p>`
                : ""
            }
            ${
              submission.preferredTime
                ? `<p><strong>Orario preferito:</strong> ${getTimeLabel(
                    submission.preferredTime
                  )}</p>`
                : ""
            }
          </div>
          
          <h3>🚀 Cosa succede ora?</h3>
          <ol>
            <li><strong>Entro 24 ore</strong> ti contatteremo per confermare l'appuntamento</li>
            <li>Prepareremo una <strong>consulenza personalizzata</strong> per le tue esigenze</li>
            <li>Ti presenteremo le <strong>migliori soluzioni</strong> per il tuo progetto</li>
          </ol>
          
          <div class="highlight">
            <p><strong>🎯 Il nostro impegno:</strong> Creare contenuti che trasformano la tua presenza digitale in risultati concreti.</p>
          </div>
          
          <p>Nel frattempo, puoi seguirci sui nostri canali:</p>
          <p>📸 <strong>Instagram:</strong> @d.perspective.studio</p>
          
          <p>Se hai domande urgenti, non esitare a contattarci:</p>
          <p>📧 <strong>Email:</strong> d.perspectivestudio@gmail.com</p>
          
          <p>Grazie ancora per la fiducia!</p>
          
          <p><strong>Il Team di Perspective Studio</strong></p>
        </div>
        
        <div class="footer">
          <p>Questo messaggio è stato inviato automaticamente in risposta alla tua richiesta di contatto.</p>
          <p>© 2024 Perspective Studio - Tutti i diritti riservati</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Helper functions for labels
function getServiceLabel(service: string): string {
  const services: Record<string, string> = {
    "social-ads": "Gestione Social & ADS",
    "photo-video": "Produzione Foto & Video",
    wedding: "Servizi Wedding",
    complete: "Pacchetto Completo",
    consultation: "Solo Consulenza",
  };
  return services[service] || service;
}

function getBudgetLabel(budget: string): string {
  const budgets: Record<string, string> = {
    "500-1000": "€500 - €1.000",
    "1000-2500": "€1.000 - €2.500",
    "2500-5000": "€2.500 - €5.000",
    "5000+": "€5.000+",
    discuss: "Da discutere",
  };
  return budgets[budget] || budget;
}

function getTimeLabel(time: string): string {
  const times: Record<string, string> = {
    morning: "Mattina (9:00 - 12:00)",
    afternoon: "Pomeriggio (14:00 - 17:00)",
    evening: "Sera (18:00 - 20:00)",
  };
  return times[time] || time;
}
