import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
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

const awsCopy = {
  title: "Discuss your AWS costs.",
  description: "Tell us where your AWS bill is growing and what you want to improve. We will help you decide whether a cost review is the right next step.",
  prompt: "Which AWS costs concern you most, and what would you like to change? Include your main services and timeline if you know them.",
};
const serviceCopy = new Map([
  ["AWS Cost Optimization Audit", awsCopy],
  ["Reduce cloud costs", awsCopy],
  ["Improve deployment speed", {
    title: "Discuss your deployment pipeline.",
    description: "Tell us what makes releases slow or unreliable. We will help you identify a practical first step for your team.",
    prompt: "How do you deploy today, where do releases get delayed or fail, and what would a better release process look like?",
  }],
  ["Scale Kubernetes reliably", {
    title: "Discuss your Kubernetes reliability.",
    description: "Tell us how your workloads respond to demand and where reliability needs to improve. We will help you decide what to review first.",
    prompt: "What happens when demand changes? Share your main scaling or reliability concern, what you have tried, and the outcome you need.",
  }],
  ["DevOps consulting", {
    title: "Discuss your DevOps needs.",
    description: "Tell us where infrastructure or delivery is slowing your team down. We will help you define a focused next step.",
    prompt: "What does your team run today, what keeps getting in the way, and what would you like to improve first?",
  }],
]);

const Contact = ({ standalone = false }: { standalone?: boolean }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [projectType, setProjectType] = useState("");
  const submitting = useRef(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAt = useRef(Date.now());
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const focus = searchParams.get("focus");
  const defaultProjectType = projectFocus.get(focus ?? "") ?? "";
  const projectTypeRef = useRef<HTMLSelectElement>(null);
  const copy = serviceCopy.get(projectType);
  const Heading = standalone ? "h1" : "h2";
  const Subheading = standalone ? "h2" : "h3";

  // The static contact HTML has no query string; apply service copy after hydration.
  useEffect(() => {
    if (projectTypeRef.current) projectTypeRef.current.value = defaultProjectType;
    setProjectType(defaultProjectType);
  }, [defaultProjectType]);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
    else if (error) feedbackRef.current?.focus();
  }, [submitted, error]);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleFormStart = () => {
    if (started) return;
    setStarted(true);
    trackEvent("Lead Form Started", {
      page: location.pathname,
      focus: projectTypeRef.current?.value || "Not specified",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current || (TURNSTILE_SITE_KEY && !turnstileToken)) return;
    submitting.current = true;
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

    let failureMessage = "";
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.success !== true) {
        if (response.status === 429) {
          failureMessage = "Please wait a few minutes before trying again.";
        } else if (response.status === 400 && result?.code === "verification_failed") {
          failureMessage = "Please complete the security check below, then try again. Your details are still here.";
        } else if (response.status === 400) {
          failureMessage = "Please check your name, email and message, then try again. Your details are still here.";
        } else {
          failureMessage = "We couldn’t confirm your message was received. Please try again in a moment, or email us directly.";
        }
      } else {
        setSubmitted(true);
        trackEvent("Lead Form Submitted", {
          page: location.pathname,
          focus: projectType || "Not specified",
        });
        form.reset();
      }
    } catch {
      failureMessage = "We couldn’t confirm your message was received. Check your connection and try again, or email us directly.";
    } finally {
      // Verification tokens are single-use, including when delivery fails afterwards.
      setTurnstileToken("");
      setTurnstileKey((key) => key + 1);
      setLoading(false);
      submitting.current = false;
    }
    if (failureMessage) {
      setError(failureMessage);
      trackEvent("Lead Form Error", {
        page: location.pathname,
        focus: projectType || "Not specified",
      });
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-brand-navy/15 bg-brand-off-white px-4 py-3.5 text-brand-navy outline-none transition placeholder:text-brand-teal/60 focus:border-brand-teal focus:ring-2 focus:ring-brand-mint";

  return (
    <section id="contact" className={`scroll-mt-24 bg-brand-mint px-6 ${standalone ? "pb-16 pt-28 md:pb-24 md:pt-36" : "py-24 md:py-32"}`}>
      <div className="container">
        <div className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-x-20 lg:gap-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-navy">
              Start a conversation
            </span>
            <Heading className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] text-brand-navy md:text-6xl">
              {copy?.title ?? (standalone ? "Talk with a DevOps and cloud engineer." : "What is getting in the way of growth?")}
            </Heading>
            <p className="mt-6 text-lg leading-relaxed text-brand-navy/75">
              {copy?.description ?? "Tell us where your platform is slowing down. We will reply with useful next steps."}
            </p>
          </motion.div>

          <motion.div
            className="shadow-soft rounded-[2rem] bg-brand-off-white p-6 md:p-9 lg:col-start-2 lg:row-span-2 lg:row-start-1"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {submitted ? (
              <div className="flex min-h-[32rem] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-navy text-brand-yellow">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <Subheading ref={successRef} tabIndex={-1} className="mt-6 text-3xl font-bold text-brand-navy">
                  Thanks — we received it.
                </Subheading>
                <p className="mt-3 max-w-md text-brand-teal">
                  We will review the details and get back to you within one business day.
                </p>
              </div>
            ) : (
              <form name="lead-form" onFocus={handleFormStart} onSubmit={handleSubmit} aria-busy={loading}>
                <div className="mb-7">
                  <Subheading className="text-2xl font-bold text-brand-navy">
                    Request a free consultation
                  </Subheading>
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
                      minLength={2}
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
                    Company (optional)
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
                    Main priority (optional)
                    <select
                      ref={projectTypeRef}
                      name="projectType"
                      defaultValue={defaultProjectType}
                      onChange={(event) => setProjectType(event.target.value)}
                      className={fieldClass}
                    >
                      <option value="" disabled>
                        Choose one
                      </option>
                      {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </label>
                </div>

                <div className="mt-5 text-sm font-bold text-brand-navy">
                  <label htmlFor="enquiry-message">What is happening today?</label>
                  <p id="enquiry-guidance" className="mt-2 font-normal leading-relaxed text-brand-teal">
                    {copy?.prompt ?? "Share the challenge, the outcome you need and your timeline, if you have one."}
                  </p>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    aria-describedby="enquiry-guidance"
                    placeholder="A short description is enough to start."
                    rows={5}
                    minLength={10}
                    maxLength={3000}
                    required
                    className={`${fieldClass} resize-none`}
                  />
                </div>

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

                {error && (
                  <div
                    ref={feedbackRef}
                    tabIndex={-1}
                    className="mt-4 rounded-xl bg-brand-yellow/30 p-3 text-sm font-semibold text-brand-navy"
                    role="alert"
                  >
                    <p>{error}</p>
                    <a href="mailto:sales@anrotex.com" className="mt-2 inline-block underline underline-offset-4">Email sales@anrotex.com</a>
                  </div>
                )}

                <TurnstileWidget
                  key={turnstileKey}
                  onTokenChange={handleTurnstileToken}
                />

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
          <div className="lg:col-start-1 lg:row-start-2">
            <Subheading className="text-xl font-bold text-brand-navy">What happens next</Subheading>
            <div className="mt-5 space-y-4">
              {[
                "An engineer will review your enquiry and reply within one business day.",
                "We will arrange a free 30-minute call to understand your priorities.",
                "You can decide on the next step after discussing the scope. No obligation.",
              ].map((item) => (
                <p key={item} className="flex items-start gap-3 text-brand-navy">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" aria-hidden="true" />
                  {item}
                </p>
              ))}
            </div>
            <a href="mailto:sales@anrotex.com" className="mt-8 inline-flex items-center gap-3 font-bold text-brand-navy">
              <Mail className="h-5 w-5" aria-hidden="true" />
              sales@anrotex.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
