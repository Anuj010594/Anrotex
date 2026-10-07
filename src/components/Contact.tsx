import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useCallback, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import TurnstileWidget from "@/components/TurnstileWidget";
import { trackEvent } from "@/lib/analytics";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile";
import { PROJECT_TYPES } from "@/lib/project-types";

const projectFocus = new Map<string, (typeof PROJECT_TYPES)[number]>([
  ["aws-audit", "AWS Cost Optimization Audit"],
  ["aws-cost", "Reduce cloud costs"],
  ["cicd", "Improve deployment speed"],
  ["devops", "DevOps consulting"],
  ["kubernetes", "Scale Kubernetes reliably"],
]);

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const startedAt = useRef(Date.now());
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const focus = searchParams.get("focus");
  const defaultProjectType = projectFocus.get(focus ?? "") ?? "";
  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleFormStart = () => {
    if (started) return;
    setStarted(true);
    trackEvent("Lead Form Started", { page: location.pathname });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const projectType = String(formData.get("projectType") || "");

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      company: String(formData.get("company") || ""),
      projectType,
      message: String(formData.get("message") || ""),
      source: `${location.pathname}${location.search}`,
      website: String(formData.get("website") || ""),
      startedAt: startedAt.current,
      turnstileToken,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => ({
        success: false,
        error: "The enquiry service returned an invalid response.",
      }));

      if (!response.ok || !result.success) {
        if (response.status === 429) {
          throw new Error(
            "Too many requests were received. Please wait a few minutes or email us directly.",
          );
        }
        throw new Error(
          result.error ||
            "We could not securely send your message. Please email us directly.",
        );
      }

      setSubmitted(true);
      trackEvent("Lead Form Submitted", {
        page: location.pathname,
        focus: projectType || "Not specified",
      });
      form.reset();
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
    } catch (submitError) {
      trackEvent("Lead Form Error", { page: location.pathname });
      setError(
        submitError instanceof Error
          ? submitError.message
          : "We could not send that message. Please email sales@anrotex.com instead.",
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-brand-navy/15 bg-brand-off-white px-4 py-3.5 text-brand-navy outline-none transition placeholder:text-brand-teal/60 focus:border-brand-teal focus:ring-2 focus:ring-brand-mint";

  return (
    <section id="contact" className="scroll-mt-24 bg-brand-mint px-6 py-24 md:py-32">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy">
              Start a conversation
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">
              What is getting in the way of growth?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              Tell us where your platform is slowing down. We will reply with
              useful next steps.
            </p>

            <div className="mt-9 space-y-4">
              {[
                "A focused 30-minute discovery call",
                "A candid view of the highest-leverage next step",
                "No hard sell and no obligation",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 font-semibold text-brand-navy">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  {item}
                </p>
              ))}
            </div>

            <a
              href="mailto:sales@anrotex.com"
              className="mt-10 inline-flex items-center gap-3 font-bold text-brand-navy"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-navy text-brand-off-white">
                <Mail className="h-5 w-5" />
              </span>
              sales@anrotex.com
            </a>
          </motion.div>

          <motion.div
            className="shadow-soft rounded-[2rem] bg-brand-off-white p-6 md:p-9"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-brand-yellow">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-3xl font-bold text-brand-navy">
                  Thanks — we received it.
                </h3>
                <p className="mt-3 max-w-md text-brand-teal">
                  We will review the details and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form name="lead-form" onFocus={handleFormStart} onSubmit={handleSubmit}>
                <div className="mb-7">
                  <h3 className="text-2xl font-bold text-brand-navy">
                    Request a free consultation
                  </h3>
                  <p className="mt-2 text-sm text-brand-teal">
                    A few details help us make the first conversation useful.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-bold text-brand-navy">
                    Name
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      maxLength={80}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="text-sm font-bold text-brand-navy">
                    Work email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      maxLength={254}
                      required
                      className={fieldClass}
                    />
                  </label>
                  <label className="text-sm font-bold text-brand-navy">
                    Company
                    <input
                      name="company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Company name"
                      maxLength={120}
                      className={fieldClass}
                    />
                  </label>
                  <label className="text-sm font-bold text-brand-navy">
                    Main priority
                    <select
                      name="projectType"
                      defaultValue={defaultProjectType}
                      className={fieldClass}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </label>
                </div>

                <label className="mt-5 block text-sm font-bold text-brand-navy">
                  What is happening today?
                  <textarea
                    name="message"
                    placeholder="A short description of the challenge, timeline, or outcome you need..."
                    rows={5}
                    minLength={10}
                    maxLength={3000}
                    required
                    className={`${fieldClass} resize-none`}
                  />
                </label>

                <label
                  className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  aria-hidden="true"
                >
                  Website
                  <input
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    maxLength={200}
                  />
                </label>

                <TurnstileWidget
                  key={turnstileKey}
                  onTokenChange={handleTurnstileToken}
                />

                {error && (
                  <p
                    className="mt-4 rounded-xl bg-brand-yellow/30 p-3 text-sm font-semibold text-brand-navy"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={
                    loading || Boolean(TURNSTILE_SITE_KEY && !turnstileToken)
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-navy px-8 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Request my consultation"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-brand-teal">
                  <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
                  Secure submission · No obligation · One business day response
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
