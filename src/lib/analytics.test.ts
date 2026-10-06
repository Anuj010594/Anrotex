import { afterEach, expect, it, vi } from "vitest";
import { trackEvent } from "./analytics";

afterEach(() => vi.unstubAllGlobals());

it("queues early conversion events and uses the loaded analytics client", () => {
  vi.stubGlobal("window", {});
  const data = { source: "cicd-hero", destination: "/contact?focus=cicd" };
  trackEvent("CTA Click", data);
  trackEvent("Lead Form Started", { page: "/contact" });
  expect(window.vaq).toEqual([
    ["event", { name: "CTA Click", data }],
    ["event", { name: "Lead Form Started", data: { page: "/contact" } }],
  ]);

  const client = vi.fn();
  window.va = client;
  trackEvent("Lead Form Submitted", { page: "/contact", focus: "Improve deployment speed" });
  expect(client).toHaveBeenCalledWith("event", {
    name: "Lead Form Submitted",
    data: { page: "/contact", focus: "Improve deployment speed" },
  });

  vi.stubGlobal("window", undefined);
  expect(() => trackEvent("CTA Click", data)).not.toThrow();
});
