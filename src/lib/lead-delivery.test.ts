import { afterEach, beforeEach, expect, it, vi } from "vitest";
import nodemailer from "nodemailer";

vi.mock("nodemailer", () => ({ default: { createTransport: vi.fn() } }));

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
  vi.stubEnv("FORM_REQUIRE_TURNSTILE", "true");
  vi.stubEnv("SMTP_HOST", "mail.example.com");
  vi.stubEnv("SMTP_PORT", "465");
  vi.stubEnv("SMTP_USER", "test@example.com");
  vi.stubEnv("SMTP_PASS", "test-password");
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

const request = (token: string) => ({
  method: "POST",
  headers: { origin: "https://www.anrotex.com", "content-type": "application/json" },
  body: {
    name: "Enquiry Test",
    email: "test@example.com",
    message: "We need help with our deployment pipeline.",
    projectType: "Improve deployment speed",
    startedAt: Date.now() - 10000,
    turnstileToken: token,
  },
});
const response = () => ({ setHeader: vi.fn(), status: vi.fn().mockReturnThis(), json: vi.fn() });

it("returns a retryable verification failure without delivering an enquiry", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
    success: false, "error-codes": ["timeout-or-duplicate"],
  }))));
  const { default: handler } = await import("../../api/send.js");
  const res = response();
  await handler(request("expired-token"), res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    success: false,
    code: "verification_failed",
    error: "Please complete the security check and try again.",
  });
  expect(nodemailer.createTransport).not.toHaveBeenCalled();
});

it("reports success only after delivery accepts a fresh verified attempt", async () => {
  const verification = vi.fn().mockImplementation(async () => new Response(JSON.stringify({
    success: true, action: "lead_form", hostname: "www.anrotex.com",
  })));
  vi.stubGlobal("fetch", verification);
  const sendMail = vi.fn().mockRejectedValueOnce(new Error("Temporary delivery failure")).mockResolvedValueOnce({});
  vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail } as never);
  const { default: handler } = await import("../../api/send.js");
  const failed = response();
  await handler(request("first-token"), failed);
  expect(failed.status).toHaveBeenCalledWith(502);
  expect(failed.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  const retried = response();
  await handler(request("fresh-token"), retried);
  expect(retried.status).toHaveBeenCalledWith(200);
  expect(retried.json).toHaveBeenCalledWith({ success: true, requestId: expect.any(String) });
  expect(verification.mock.calls.map(([, options]) => options.body.get("response"))).toEqual(["first-token", "fresh-token"]);
  expect(sendMail).toHaveBeenCalledTimes(2);
});
