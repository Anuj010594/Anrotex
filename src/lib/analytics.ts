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
  }
}

/**
 * Queue conversion events without pulling the analytics SDK into the critical
 * rendering bundle. The deferred Vercel script consumes this queue once ready.
 */
export function trackEvent(
  name: string,
  data?: Record<string, AnalyticsValue>,
) {
  if (typeof window === "undefined") return;

  if (!window.va) {
    window.va = (...args) => {
      window.vaq ??= [];
      window.vaq.push(args);
    };
  }

  window.va("event", { name, data });
}
