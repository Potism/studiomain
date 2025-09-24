# 📧 Email Notifications Setup Guide

## ✅ What's Already Done

The contact form now includes **complete email functionality**:

- ✅ **Business Notifications**: You'll receive detailed emails for every contact form submission
- ✅ **Client Confirmations**: Customers get professional confirmation emails
- ✅ **Beautiful HTML Templates**: Professional, branded email designs
- ✅ **Italian Language**: All emails are in Italian for your Italian audience
- ✅ **Comprehensive Data**: All form fields included in notifications

## 🚀 To Enable Email Notifications

### Step 1: Sign Up for Resend (Free)

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Click **Create API Key**
3. Give it a name like "Perspective Studio Website"
4. Copy the API key (starts with `re_`)

### Step 3: Add Environment Variables

Create a file called `.env.local` in your project root with:

```env
# Resend API Configuration
RESEND_API_KEY=re_your_actual_api_key_here

# Your business email for receiving notifications
CONTACT_EMAIL=d.perspectivestudio@gmail.com

# From email (will be verified with Resend)
FROM_EMAIL=noreply@perspectivestudio.com
```

### Step 4: Domain Verification (Optional but Recommended)

For better deliverability:

1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `perspectivestudio.com`)
3. Follow DNS setup instructions
4. Update `FROM_EMAIL` to use your domain

## 📨 What Emails Look Like

### Business Notification Email (to you):

```
🔔 Nuova Richiesta di Contatto - [Client Name]

👤 Nome: [Name]
📧 Email: [Email] (clickable)
📱 Telefono: [Phone] (clickable)
🏢 Azienda: [Company]
🎯 Servizio: [Service Type]
💰 Budget: [Budget Range]
📅 Data Preferita: [Date]
⏰ Orario Preferito: [Time]
💬 Messaggio: [Message]
🕐 Data/Ora Invio: [Timestamp]
```

### Client Confirmation Email:

```
✅ Richiesta Ricevuta - Perspective Studio

Ciao [Name],

Grazie per aver scelto Perspective Studio! La tua richiesta è stata ricevuta con successo.

📋 Riassunto della tua richiesta:
- Servizio: [Service]
- Budget: [Budget]
- Data preferita: [Date]

🚀 Cosa succede ora?
1. Entro 24 ore ti contatteremo per confermare l'appuntamento
2. Prepareremo una consulenza personalizzata per le tue esigenze
3. Ti presenteremo le migliori soluzioni per il tuo progetto

📸 Instagram: @d.perspective.studio
📧 Email: d.perspectivestudio@gmail.com
```

## 🧪 Testing

Once you add the API key:

1. Submit a test form on your website
2. Check your email (d.perspectivestudio@gmail.com)
3. Check the test email inbox for confirmation

## ⚠️ Current Status

Without the API key, the system will:

- ✅ Still work (form submissions succeed)
- ⚠️ Log "RESEND_API_KEY not found" in console
- ✅ Show all email content in console logs
- ❌ Not send actual emails

## 🎯 Next Steps

1. **Set up Resend account** (5 minutes)
2. **Add API key** to environment variables
3. **Test the system** with a real submission
4. **Optional**: Set up custom domain for better branding

## 💰 Pricing

- **Free Tier**: 3,000 emails/month (more than enough for contact forms)
- **Paid Plans**: Start at $20/month for 50,000 emails

## 🆘 Need Help?

If you need assistance with setup:

1. The console logs show exactly what emails would be sent
2. All form data is still logged for now
3. The system gracefully handles missing API keys

The email system is ready to go - just add your Resend API key!
