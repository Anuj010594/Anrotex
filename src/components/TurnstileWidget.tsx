import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";

type TurnstileOptions = {
  sitekey: string;
  action: string;
  theme: "light";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileOptions) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  onTokenChange: (token: string) => void;
};

const SCRIPT_ID = "anrotex-turnstile-script";
const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export default function TurnstileWidget({
  onTokenChange,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !containerRef.current) return;

    let cancelled = false;
    let widgetId = "";

    const renderWidget = () => {
      if (
        cancelled ||
        widgetId ||
        !containerRef.current ||
        !window.turnstile
      ) {
        return;
      }

      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: "lead_form",
        theme: "light",
        callback: onTokenChange,
        "expired-callback": () => onTokenChange(""),
        "error-callback": () => onTokenChange(""),
      });
    };

    const existingScript = document.getElementById(
      SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      existingScript?.removeEventListener("load", renderWidget);
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [onTokenChange]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <div className="mt-5">
      <div ref={containerRef} aria-label="Security verification" />
      <p className="mt-2 text-xs text-brand-teal">
        Security verification protects this form from automated abuse.
      </p>
    </div>
  );
}
