import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { z } from "zod";
import { leadSubmissionSchema } from "../src/lib/lead-security";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
};

const rateLimitStore = new Map<string, RateLimitEntry>();
const DEFAULT_ALLOWED_ORIGINS = [
  "https://www.anrotex.com",
  "https://anrotex.com",
];

const smtpEnvironmentSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.coerce.number().int().positive(),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string().min(1),
  LEAD_RECIPIENT: z.string().email().optional(),
});

function getHeader(req: any, name: string) {
  const value = req.headers?.[name];
  return Array.isArray(value) ? value[0] : value;
}

function getClientIp(req: any) {
  const forwarded = getHeader(req, "x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    getHeader(req, "x-real-ip") ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

function numberFromEnvironment(name: string, fallback: number, maximum: number) {
  const value = Number(process.env[name]);
  if (!Number.isFinite(value) || value <= 0) return fallback;
  return Math.min(Math.floor(value), maximum);
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const maximum = numberFromEnvironment("FORM_RATE_LIMIT_MAX", 5, 20);
  const windowMs = numberFromEnvironment(
    "FORM_RATE_LIMIT_WINDOW_MS",
    10 * 60 * 1000,
    60 * 60 * 1000,
  );

  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }

  const current = rateLimitStore.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= maximum) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return { allowed: true, retryAfterSeconds: 0 };
}

function getAllowedOrigins() {
  const configured = (process.env.FORM_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const vercelOrigin = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  return new Set([
    ...DEFAULT_ALLOWED_ORIGINS,
    ...configured,
    ...(vercelOrigin ? [vercelOrigin] : []),
  ]);
}

function isAllowedOrigin(req: any) {
  const origin = getHeader(req, "origin");
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";

  if (!origin) return !isProduction;
  if (!isProduction && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return true;
  }

  return getAllowedOrigins().has(origin);
}

function getAllowedTurnstileHostnames() {
  const configured = (
    process.env.TURNSTILE_ALLOWED_HOSTNAMES ||
    "www.anrotex.com,anrotex.com"
  )
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (process.env.VERCEL_URL) configured.push(process.env.VERCEL_URL);
  return new Set(configured);
}

async function validateTurnstile(
  token: string,
  ip: string,
  idempotencyKey: string,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const turnstileRequired = process.env.FORM_REQUIRE_TURNSTILE === "true";

  if (!secret) {
    return { success: !turnstileRequired, reason: "not_configured" };
  }

  if (!token) {
    return { success: false, reason: "missing_token" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
      idempotency_key: idempotencyKey,
    });
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: controller.signal,
      },
    );
    const result = (await response.json()) as TurnstileResponse;
    const validContext =
      result.action === "lead_form" &&
      Boolean(result.hostname && getAllowedTurnstileHostnames().has(result.hostname));

    return {
      success: response.ok && result.success && validContext,
      reason:
        response.ok && result.success && validContext
          ? "verified"
          : result["error-codes"]?.join(",") || "context_mismatch",
    };
  } catch {
    return { success: false, reason: "verification_unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req: any, res: any) {
  const requestId = randomUUID();
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed." });
  }

  if (!isAllowedOrigin(req)) {
    return res.status(403).json({ success: false, error: "Request origin rejected." });
  }

  const contentType = getHeader(req, "content-type") || "";
  if (!contentType.includes("application/json")) {
    return res.status(415).json({
      success: false,
      error: "The enquiry must be submitted as JSON.",
    });
  }

  let requestBody = req.body;
  if (typeof requestBody === "string") {
    try {
      requestBody = JSON.parse(requestBody);
    } catch {
      return res.status(400).json({ success: false, error: "Invalid request body." });
    }
  }

  const parsed = leadSubmissionSchema.safeParse(requestBody);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: parsed.error.issues[0]?.message || "Check the submitted fields.",
    });
  }

  const lead = parsed.data;

  // Honeypot submissions receive a neutral response and are never delivered.
  if (lead.website) {
    return res.status(200).json({ success: true, requestId });
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", String(rateLimit.retryAfterSeconds));
    return res.status(429).json({
      success: false,
      error: "Too many enquiries were submitted. Please try again shortly.",
    });
  }

  const turnstile = await validateTurnstile(
    lead.turnstileToken,
    ip,
    requestId,
  );
  if (!turnstile.success) {
    console.warn(
      JSON.stringify({
        event: "lead_verification_failed",
        requestId,
        reason: turnstile.reason,
      }),
    );
    return res.status(400).json({
      success: false,
      error: "Security verification failed. Please refresh and try again.",
    });
  }

  const smtpEnvironment = smtpEnvironmentSchema.safeParse(process.env);
  if (!smtpEnvironment.success) {
    console.error(
      JSON.stringify({ event: "lead_delivery_not_configured", requestId }),
    );
    return res.status(503).json({
      success: false,
      error: "Secure enquiry delivery is temporarily unavailable.",
    });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_RECIPIENT } =
    smtpEnvironment.data;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    await transporter.sendMail({
      from: `"Anrotex Website" <${SMTP_USER}>`,
      to: LEAD_RECIPIENT || SMTP_USER,
      replyTo: lead.email,
      subject: `New ${lead.projectType || "website"} enquiry`,
      text: [
        `Request ID: ${requestId}`,
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company || "Not provided"}`,
        `Area of focus: ${lead.projectType || "Not specified"}`,
        `Source: ${lead.source}`,
        "",
        "Message:",
        lead.message,
      ].join("\n"),
    });

    console.info(
      JSON.stringify({
        event: "lead_delivered",
        requestId,
        source: lead.source,
        focus: lead.projectType || "Not specified",
      }),
    );

    return res.status(200).json({ success: true, requestId });
  } catch (error) {
    console.error(
      JSON.stringify({
        event: "lead_delivery_failed",
        requestId,
        errorType: error instanceof Error ? error.name : "UnknownError",
      }),
    );
    return res.status(502).json({
      success: false,
      error: "We could not deliver your enquiry. Please email us directly.",
    });
  }
}
