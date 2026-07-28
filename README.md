# Anrotex website

Anrotex’s React and Vite website for cloud infrastructure, DevOps, Kubernetes,
CI/CD, and AWS cost optimization services.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
npx tsc -b --pretty false
npm test -- --exclude 'src/**/._*'
```

## Lead-form configuration

Copy `.env.example` to `.env` locally and configure the same values in the
production hosting environment. Never commit `.env` or real credentials.

The production form uses:

- Zoho SMTP credentials for delivery.
- Origin validation and strict server-side field validation.
- A honeypot and rate limiting for automated abuse.
- Cloudflare Turnstile when `VITE_TURNSTILE_SITE_KEY` and
  `TURNSTILE_SECRET_KEY` are configured.

Set `FORM_REQUIRE_TURNSTILE=true` only after both Turnstile values are present.
The server validates every Turnstile token, its `lead_form` action, and the
approved hostname before delivering an enquiry.

Because an earlier `.env` was committed, rotate the SMTP app password before
the next production deployment. Removing the file in a new commit prevents
future tracking but does not erase old repository history.
