import { useEffect, useRef, useState } from "react";
import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_PREFERENCES_EVENT,
  GA4_CONFIGURED,
  getAnalyticsConsent,
  setAnalyticsConsent,
  startGoogleAnalytics,
} from "@/lib/analytics";

export default function AnalyticsPreferences() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ReturnType<typeof getAnalyticsConsent>>(null);
  const panel = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!GA4_CONFIGURED) return;
    const savedChoice = getAnalyticsConsent();
    setChoice(savedChoice);
    setOpen(savedChoice === null);
    startGoogleAnalytics();
    const showPreferences = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const syncChoice = (event: StorageEvent) => {
      if (event.key !== ANALYTICS_CONSENT_KEY) return;
      if (event.newValue === "granted" || event.newValue === "denied") {
        setAnalyticsConsent(event.newValue);
        setChoice(event.newValue);
        setOpen(false);
      }
    };
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, showPreferences);
    window.addEventListener("storage", syncChoice);
    return () => {
      window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, showPreferences);
      window.removeEventListener("storage", syncChoice);
    };
  }, []);

  useEffect(() => {
    if (open && returnFocus.current) panel.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    returnFocus.current?.focus();
    returnFocus.current = null;
  };

  const choose = (allow: boolean) => {
    setAnalyticsConsent(allow ? "granted" : "denied");
    setChoice(allow ? "granted" : "denied");
    close();
  };

  if (!GA4_CONFIGURED || !open) return null;

  return (
    <section
      ref={panel}
      tabIndex={-1}
      aria-labelledby="analytics-choice-heading"
      className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-brand-navy/20 bg-brand-off-white p-5 text-brand-navy shadow-xl sm:p-6"
      onKeyDown={(event) => { if (event.key === "Escape" && choice) close(); }}
    >
      <h2 id="analytics-choice-heading" className="text-lg font-bold">Analytics cookies</h2>
      <p className="mt-2 text-sm leading-relaxed">
        With your permission, we use Google Analytics cookies to understand which pages and services
        interest visitors. We do not send your name, email address or message to Google Analytics, or use it for advertising.
        You can change your choice using Cookie preferences in the footer.{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
          How Google uses this data
        </a>
      </p>
      {choice && <p className="mt-3 text-sm font-semibold">Analytics cookies are currently {choice === "granted" ? "allowed" : "declined"}.</p>}
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose(false)} className="rounded-lg border border-brand-navy px-4 py-2.5 text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          Decline analytics cookies
        </button>
        <button type="button" onClick={() => choose(true)} className="rounded-lg border border-brand-navy bg-brand-navy px-4 py-2.5 text-sm font-bold text-brand-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy">
          Allow analytics cookies
        </button>
        {choice && <button type="button" onClick={close} className="px-2 py-2.5 text-sm font-semibold underline underline-offset-2">Keep current choice</button>}
      </div>
    </section>
  );
}
