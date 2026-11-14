import { afterEach, beforeEach, expect, it, vi } from "vitest";

let storage: Map<string, string>;
let scripts: Array<{ src: string }>;

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("PROD", true);
  vi.stubEnv("VITE_GA4_MEASUREMENT_ID", "G-TEST123456");
  storage = new Map();
  scripts = [];
  vi.stubGlobal("window", {
    location: new URL("https://www.anrotex.com/services?utm_source=linkedin&utm_medium=social&email=private%40example.com#contact"),
    localStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  });
  vi.stubGlobal("document", {
    referrer: "https://www.linkedin.com/posts/private-person?email=private@example.com",
    cookie: "",
    createElement: () => ({}),
    head: { appendChild: (script: { src: string }) => scripts.push(script) },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const commands = () => (window.dataLayer ?? []).map((command) => Array.from(command as ArrayLike<unknown>));
const pageViews = () => commands().filter(([type, name]) => type === "event" && name === "page_view");

it("does not load Google or replay interactions collected before consent", async () => {
  const analytics = await import("./analytics");
  analytics.trackPageView("/services", "Services");
  analytics.startGoogleAnalytics();
  analytics.trackEvent("CTA Click", { source: "services-help-choose", destination: "/contact" });
  expect(scripts).toHaveLength(0);
  expect(commands()).toHaveLength(0);
  analytics.setAnalyticsConsent("denied");
  expect(scripts).toHaveLength(0);
  analytics.setAnalyticsConsent("granted");
  analytics.startGoogleAnalytics();
  expect(scripts).toHaveLength(1);
  expect(pageViews()).toHaveLength(1);
  expect(commands().some(([, name]) => name === "cta_click")).toBe(false);
  expect(pageViews()[0][2]).toEqual({
    page_title: "Services",
    page_location: "https://www.anrotex.com/services?utm_source=linkedin&utm_medium=social",
    page_referrer: "https://www.linkedin.com/",
  });
  expect(commands().find(([type]) => type === "config")?.[2]).toMatchObject({ send_page_view: false, allow_google_signals: false });
});

it("counts each committed route once, including back navigation, with the right referrer", async () => {
  const analytics = await import("./analytics");
  analytics.setAnalyticsConsent("granted");
  analytics.trackPageView("/services", "Services");
  analytics.trackPageView("/services", "Services");
  window.location.href = "https://www.anrotex.com/contact?focus=cicd";
  analytics.trackPageView("/contact", "Contact");
  window.location.href = "https://www.anrotex.com/services";
  analytics.trackPageView("/services", "Services");
  expect(pageViews()).toHaveLength(3);
  expect(pageViews()[1][2]).toMatchObject({ page_title: "Contact", page_referrer: "https://www.anrotex.com/services?utm_source=linkedin&utm_medium=social" });
  expect(pageViews()[2][2]).toMatchObject({ page_referrer: "https://www.anrotex.com/contact?focus=cicd" });
});

it("attributes form events to the current route under Google's parameter precedence", async () => {
  const analytics = await import("./analytics");
  analytics.trackPageView("/services", "Services");
  analytics.setAnalyticsConsent("granted");
  window.location.href = "https://www.anrotex.com/contact?focus=cicd";
  analytics.trackPageView("/contact", "Contact");
  analytics.trackEvent("Lead Form Started", { page: "/contact" });
  let globalParameters = {};
  let configParameters = {};
  let formParameters = {};
  for (const [command, name, parameters] of commands()) {
    if (command === "set") globalParameters = { ...globalParameters, ...name as object };
    if (command === "config") configParameters = { ...configParameters, ...parameters as object };
    if (command === "event" && name === "form_start") {
      formParameters = { ...globalParameters, ...configParameters, ...parameters as object };
    }
  }
  expect(formParameters).toMatchObject({
    page_title: "Contact",
    page_location: "https://www.anrotex.com/contact?focus=cicd",
    page_referrer: "https://www.anrotex.com/services?utm_source=linkedin&utm_medium=social",
  });
});

it("maps confirmed submissions and sends only permitted event parameters to Google", async () => {
  const { setAnalyticsConsent, trackEvent } = await import("./analytics");
  setAnalyticsConsent("granted");
  trackEvent("Lead Form Started", { page: "/contact", focus: "Improve deployment speed" });
  trackEvent("Lead Form Error", { page: "/contact", focus: "Improve deployment speed", message: "Private message" });
  for (const name of ["form_start", "form_error"]) {
    expect(commands().filter(([, event]) => event === name)).toEqual([
      ["event", name, { form_name: "enquiry", service_interest: "Improve deployment speed" }],
    ]);
  }
  expect(commands().some(([, name]) => name === "generate_lead")).toBe(false);
  trackEvent("Lead Form Submitted", { focus: "Improve deployment speed", email: "private@example.com", message: "Private message" });
  expect(commands().filter(([, name]) => name === "generate_lead")).toEqual([
    ["event", "generate_lead", { form_name: "enquiry", service_interest: "Improve deployment speed" }],
  ]);
  trackEvent("Service Click", { source: "services-comparison", destination: "/contact?focus=cicd&email=private%40example.com" });
  expect(commands().at(-1)).toEqual(["event", "service_click", { event_source: "services-comparison", link_url: "https://www.anrotex.com/contact?focus=cicd" }]);
  expect(JSON.stringify(commands())).not.toMatch(/private@example|Private message/);
  expect(JSON.stringify(window.vaq)).not.toMatch(/private@example|Private message/);
  trackEvent("Lead Form Started", { focus: "private@example.com" });
  expect(commands().at(-1)).toEqual(["event", "form_start", { form_name: "enquiry" }]);
});

it("stops measurement after withdrawal, even when persisting the choice fails", async () => {
  const analytics = await import("./analytics");
  analytics.setAnalyticsConsent("granted");
  analytics.trackPageView("/services", "Services");
  window.localStorage.setItem = () => { throw new Error("Storage unavailable"); };
  analytics.setAnalyticsConsent("denied");
  const count = commands().length;
  analytics.trackEvent("Lead Form Submitted", { focus: "DevOps consulting" });
  analytics.trackPageView("/contact", "Contact");
  expect(commands()).toHaveLength(count);
  expect((window as unknown as Record<string, unknown>)["ga-disable-G-TEST123456"]).toBe(true);
  expect(document.cookie).toContain("Max-Age=0");
});

it("keeps each starting project identifiable through the enquiry funnel without sending form details", async () => {
  const { setAnalyticsConsent, trackEvent } = await import("./analytics");
  setAnalyticsConsent("granted");
  for (const focus of ["AWS Infrastructure Review", "CI/CD Pipeline Setup", "Terraform AWS Foundation"]) {
    trackEvent("Lead Form Started", { focus, email: "private@example.com" });
    expect(commands().at(-1)).toEqual(["event", "form_start", { form_name: "enquiry", service_interest: focus }]);
    trackEvent("Lead Form Submitted", { focus, message: "Private workload details" });
    expect(commands().at(-1)).toEqual(["event", "generate_lead", { form_name: "enquiry", service_interest: focus }]);
  }
  expect(JSON.stringify(commands())).not.toMatch(/private@example|Private workload/);
});

it("excludes local, preview and opted-out visits from both analytics providers", async () => {
  const analytics = await import("./analytics");
  for (const url of ["http://localhost:8080/", "https://anrotex-preview.vercel.app/", "https://www.anrotex.com/?analytics=off"]) {
    window.location.href = url;
    analytics.setAnalyticsConsent("granted");
    analytics.trackEvent("CTA Click");
    expect(scripts).toHaveLength(0);
    expect(window.vaq).toBeUndefined();
  }
  window.location.href = "https://www.anrotex.com/services";
  expect(analytics.isAnalyticsExcluded()).toBe(true);
  window.location.href = "https://www.anrotex.com/?analytics=on";
  expect(analytics.isAnalyticsExcluded()).toBe(false);
});

it("keeps Vercel tracking available when GA4 is unconfigured and is safe during rendering", async () => {
  vi.stubEnv("VITE_GA4_MEASUREMENT_ID", "");
  const analytics = await import("./analytics");
  analytics.setAnalyticsConsent("granted");
  expect(scripts).toHaveLength(0);
  const data = { source: "cicd-hero", destination: "/contact?focus=cicd" };
  analytics.trackEvent("CTA Click", data);
  expect(window.vaq).toEqual([["event", { name: "CTA Click", data }]]);
  const client = vi.fn();
  window.va = client;
  analytics.trackEvent("Lead Form Started", { page: "/contact" });
  expect(client).toHaveBeenCalledWith("event", { name: "Lead Form Started", data: { page: "/contact" } });
  vi.stubGlobal("window", undefined);
  expect(() => analytics.trackEvent("CTA Click", data)).not.toThrow();
});
