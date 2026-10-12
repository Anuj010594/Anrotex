import { PROJECT_TYPES } from "./project-types";

type AnalyticsValue = string | number | boolean | null;

type AnalyticsCommand = [
  "event",
  {
    name: string;
    data?: Record<string, AnalyticsValue>;
  },
];

declare global {
  interface Window {
    va?: (...args: AnalyticsCommand) => void;
    vaq?: AnalyticsCommand[];
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA4_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID ?? "";
export const GA4_CONFIGURED = /^G-[A-Z0-9]+$/.test(GA4_ID);
export const ANALYTICS_CONSENT_KEY = "anrotex.analytics.consent";
const EXCLUSION_KEY = "anrotex.analytics.excluded";
export const ANALYTICS_PREFERENCES_EVENT = "anrotex:analytics-preferences";
type Consent = "granted" | "denied" | null;
let consent: Consent = null;
let consentStorageUnavailable = false;
let excluded = false;
let googleStarted = false;
let page: { path: string; title: string } | undefined;
let previousPage = "";

export function getAnalyticsConsent(): Consent {
  if (consentStorageUnavailable) return consent;
  try {
    const stored = window.localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (stored === "granted" || stored === "denied") consent = stored;
  } catch { /* The choice still works for this visit when storage is unavailable. */ }
  return consent;
}

function initialReferrer() {
  try { return new URL(document.referrer).origin + "/"; } catch { return ""; }
}

export function isAnalyticsExcluded() {
  if (typeof window === "undefined") return true;
  const mode = new URLSearchParams(window.location.search).get("analytics");
  try {
    if (mode === "off") window.localStorage.setItem(EXCLUSION_KEY, "true");
    if (mode === "on") window.localStorage.removeItem(EXCLUSION_KEY);
    excluded = window.localStorage.getItem(EXCLUSION_KEY) === "true";
  } catch { /* Keep the in-memory exclusion when storage is unavailable. */ }
  if (mode === "off") excluded = true;
  if (mode === "on") excluded = false;
  const skip = excluded || !import.meta.env.PROD || !["www.anrotex.com", "anrotex.com"].includes(window.location.hostname);
  if (skip && GA4_CONFIGURED) (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`] = true;
  return skip;
}

// Retain campaign attribution without forwarding arbitrary query strings or fragments.
export function analyticsUrl(value: string) {
  try {
    const url = new URL(value, "https://www.anrotex.com");
    const clean = new URL(url.origin + url.pathname);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "focus"]) {
      const value = url.searchParams.get(key);
      if (value && /^[a-zA-Z0-9_.~-]{1,100}$/.test(value)) clean.searchParams.set(key, value);
    }
    return clean.href;
  } catch {
    return "";
  }
}

function googleEvent(name: string, data: Record<string, AnalyticsValue>) {
  if (!googleStarted || getAnalyticsConsent() !== "granted" || isAnalyticsExcluded()) return;
  window.gtag?.("event", name, data);
}

export function trackPageView(path: string, title: string) {
  page = { path, title };
  if (!googleStarted || getAnalyticsConsent() !== "granted" || isAnalyticsExcluded()) return;
  const location = analyticsUrl(`https://www.anrotex.com${path}${window.location.search}`);
  if (previousPage === location) return;
  const referrer = previousPage || initialReferrer();
  const data = { page_location: location, page_title: title, page_referrer: referrer };
  window.gtag?.("set", data);
  googleEvent("page_view", data);
  previousPage = location;
}

export function startGoogleAnalytics() {
  if (!GA4_CONFIGURED || isAnalyticsExcluded() || getAnalyticsConsent() !== "granted") return;
  const flags = window as unknown as Record<string, unknown>;
  flags[`ga-disable-${GA4_ID}`] = false;
  if (!googleStarted) {
    window.dataLayer ??= [];
    window.gtag = function () {
      // Google expects the standard gtag arguments queue.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", {
      analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    // Keep route fields at the same scope so later navigation can replace them.
    window.gtag("set", {
      page_location: analyticsUrl(window.location.href),
      page_referrer: initialReferrer(),
    });
    window.gtag("config", GA4_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(script);
    googleStarted = true;
  } else {
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
  }
  if (page) trackPageView(page.path, page.title);
}

export function setAnalyticsConsent(value: Exclude<Consent, null>) {
  consent = value;
  try { window.localStorage.setItem(ANALYTICS_CONSENT_KEY, value); } catch { consentStorageUnavailable = true; }
  if (value === "granted") {
    startGoogleAnalytics();
  } else {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`] = true;
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    for (const name of ["_ga", `_ga_${GA4_ID.slice(2)}`]) {
      for (const domain of ["", window.location.hostname, "anrotex.com"]) {
        document.cookie = `${name}=; Max-Age=0; Path=/;${domain ? ` Domain=${domain};` : ""}`;
      }
    }
  }
}

const googleEvents = new Map([
  ["CTA Click", "cta_click"],
  ["Service Click", "service_click"],
  ["Article Click", "article_click"],
  ["Case Study Click", "case_study_click"],
  ["Lead Form Started", "form_start"],
  ["Lead Form Submitted", "generate_lead"],
  ["Lead Form Error", "form_error"],
]);

export function trackEvent(
  name: string,
  data?: Record<string, AnalyticsValue>,
) {
  if (isAnalyticsExcluded()) return;

  if (!window.va) {
    window.va = (...args) => {
      window.vaq ??= [];
      window.vaq.push(args);
    };
  }

  const safeData: Record<string, AnalyticsValue> = {};
  if (typeof data?.source === "string" && /^[a-zA-Z0-9:_ -]{1,100}$/.test(data.source)) safeData.source = data.source;
  if (typeof data?.page === "string" && /^\/[a-z0-9/-]*$/.test(data.page)) safeData.page = data.page;
  if (typeof data?.destination === "string") {
    const destination = analyticsUrl(data.destination);
    if (destination) {
      const url = new URL(destination);
      safeData.destination = data.destination.startsWith("/") ? url.pathname + url.search : destination;
    }
  }
  if (typeof data?.focus === "string" && (data.focus === "Not specified" || PROJECT_TYPES.some((type) => type === data.focus))) safeData.focus = data.focus;
  window.va("event", { name, data: safeData });

  const eventName = googleEvents.get(name);
  if (!eventName) return;
  const parameters: Record<string, AnalyticsValue> = {};
  if (typeof safeData.source === "string") parameters.event_source = safeData.source;
  if (typeof safeData.destination === "string") parameters.link_url = analyticsUrl(safeData.destination);
  if (name.startsWith("Lead Form")) parameters.form_name = "enquiry";
  if (safeData.focus) {
    parameters.service_interest = safeData.focus;
  }
  googleEvent(eventName, parameters);
}
