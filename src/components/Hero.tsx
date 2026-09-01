import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Check,
  CircleDollarSign,
  CloudCog,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  GitPullRequestArrow,
  HardDrive,
  PackageCheck,
  ScanLine,
  ServerCog,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const slides = [
  {
    id: "platform",
    eyebrow: "Platform health",
    title: "Production overview",
    status: "All systems healthy",
  },
  {
    id: "kubernetes",
    eyebrow: "Kubernetes operations",
    title: "Cluster overview",
    status: "Autoscaling active",
  },
  {
    id: "costs",
    eyebrow: "Cloud cost optimization",
    title: "Savings opportunities",
    status: "Audit in progress",
  },
  {
    id: "delivery",
    eyebrow: "CI/CD engineering",
    title: "Release workflow",
    status: "Pipeline ready",
  },
] as const;

const platformMetrics = [
  { icon: CircleDollarSign, value: "42%", label: "lower cloud spend" },
  { icon: GitPullRequestArrow, value: "3×", label: "faster deployments" },
  { icon: Gauge, value: "0", label: "migration downtime" },
];

const PlatformSlide = () => (
  <>
    <div className="grid gap-3 py-6 sm:grid-cols-3">
      {platformMetrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-brand-off-white/10 bg-brand-off-white/[0.06] p-4"
        >
          <metric.icon className="mb-4 h-5 w-5 text-brand-yellow" />
          <p className="text-2xl font-bold">{metric.value}</p>
          <p className="mt-1 text-xs leading-snug text-brand-mint">{metric.label}</p>
        </div>
      ))}
    </div>

    <div className="rounded-2xl bg-brand-off-white p-5 text-brand-navy">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Release pipeline</p>
          <p className="text-xs text-brand-teal">Last 30 days</p>
        </div>
        <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-semibold">
          +31% velocity
        </span>
      </div>
      <div className="flex h-24 items-end gap-2">
        {[36, 48, 44, 62, 58, 76, 68, 88, 82, 96].map((height, index) => (
          <motion.span
            key={`${height}-${index}`}
            className="flex-1 rounded-t-md bg-brand-teal"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ duration: 0.55, delay: 0.16 + index * 0.035 }}
          />
        ))}
      </div>
    </div>
  </>
);

const KubernetesSlide = () => (
  <div className="space-y-4 py-6">
    <div className="grid grid-cols-3 gap-3">
      {[
        { value: "12", label: "services" },
        { value: "68", label: "healthy pods" },
        { value: "3", label: "availability zones" },
      ].map((metric) => (
        <div
          key={metric.label}
          className="rounded-2xl border border-brand-off-white/10 bg-brand-off-white/[0.06] p-4"
        >
          <p className="text-2xl font-bold text-brand-yellow">{metric.value}</p>
          <p className="mt-1 text-xs leading-snug text-brand-mint">{metric.label}</p>
        </div>
      ))}
    </div>

    <div className="rounded-2xl bg-brand-off-white p-5 text-brand-navy">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-mint">
            <Boxes className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Production cluster</p>
            <p className="text-xs text-brand-teal">Capacity and scaling</p>
          </div>
        </div>
        <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold">
          Healthy
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {[
          { icon: Cpu, label: "Compute utilization", value: "61%", width: "61%" },
          { icon: HardDrive, label: "Memory utilization", value: "54%", width: "54%" },
        ].map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <item.icon className="h-4 w-4 text-brand-teal" />
                {item.label}
              </span>
              <span>{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-brand-stone">
              <motion.div
                className="h-full rounded-full bg-brand-teal"
                initial={{ width: 0 }}
                animate={{ width: item.width }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-2 text-xs font-semibold sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <Check className="h-4 w-4 text-brand-teal" /> Rolling deployments
        </p>
        <p className="flex items-center gap-2">
          <Check className="h-4 w-4 text-brand-teal" /> Horizontal autoscaling
        </p>
      </div>
    </div>
  </div>
);

const CostSlide = () => (
  <div className="space-y-4 py-6">
    <div className="rounded-2xl border border-brand-yellow/40 bg-brand-yellow/10 p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-mint">
            Optimization focus
          </p>
          <p className="mt-2 text-2xl font-bold">4 cost levers identified</p>
        </div>
        <CloudCog className="h-9 w-9 text-brand-yellow" />
      </div>
    </div>

    <div className="rounded-2xl bg-brand-off-white p-5 text-brand-navy">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-bold">Resource review</p>
          <p className="text-xs text-brand-teal">Prioritized by impact</p>
        </div>
        <CircleDollarSign className="h-5 w-5 text-brand-teal" />
      </div>

      <div className="space-y-3">
        {[
          { icon: ServerCog, label: "Compute", action: "Right-size" },
          { icon: Database, label: "Databases", action: "Tune" },
          { icon: HardDrive, label: "Storage", action: "Lifecycle" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center justify-between rounded-xl bg-brand-stone/60 px-4 py-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
          >
            <span className="flex items-center gap-3 text-sm font-bold">
              <item.icon className="h-4 w-4 text-brand-teal" />
              {item.label}
            </span>
            <span className="rounded-full bg-brand-mint px-3 py-1 text-xs font-bold">
              {item.action}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const DeliverySlide = () => {
  const stages = [
    { icon: GitBranch, label: "Build" },
    { icon: PackageCheck, label: "Test" },
    { icon: ScanLine, label: "Scan" },
    { icon: ShieldCheck, label: "Deploy" },
  ];

  return (
    <div className="space-y-4 py-6">
      <div className="rounded-2xl bg-brand-off-white p-5 text-brand-navy">
        <div>
          <p className="text-sm font-bold">Automated delivery path</p>
          <p className="text-xs text-brand-teal">Commit to production</p>
        </div>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.label}
              className="relative text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {index < stages.length - 1 && (
                <span className="absolute left-[62%] top-5 h-px w-[76%] bg-brand-mint" />
              )}
              <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-yellow">
                <stage.icon className="h-4 w-4" />
              </span>
              <p className="mt-2 text-xs font-bold">{stage.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-brand-off-white/10 bg-brand-off-white/[0.06] p-4">
          <PackageCheck className="h-5 w-5 text-brand-yellow" />
          <p className="mt-4 text-sm font-bold">Repeatable releases</p>
          <p className="mt-1 text-xs leading-relaxed text-brand-mint">
            Consistent checks across every environment.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-off-white/10 bg-brand-off-white/[0.06] p-4">
          <ArrowLeft className="h-5 w-5 text-brand-yellow" />
          <p className="mt-4 text-sm font-bold">Safer rollback</p>
          <p className="mt-1 text-xs leading-relaxed text-brand-mint">
            Restore service quickly when a release fails.
          </p>
        </div>
      </div>
    </div>
  );
};

const SlideContent = ({ slideId }: { slideId: (typeof slides)[number]["id"] }) => {
  if (slideId === "kubernetes") return <KubernetesSlide />;
  if (slideId === "costs") return <CostSlide />;
  if (slideId === "delivery") return <DeliverySlide />;
  return <PlatformSlide />;
};

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const slide = slides[activeSlide];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const changeSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="relative overflow-hidden bg-brand-off-white px-6 pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute -right-40 top-8 h-[34rem] w-[34rem] rounded-full bg-brand-stone/80" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-brand-mint/65" />

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-brand-navy/10 bg-brand-stone/60 px-4 py-2 text-sm font-semibold text-brand-navy">
              <span className="h-2 w-2 rounded-full bg-brand-yellow" />
              Founder-led cloud &amp; DevOps engineering
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-brand-navy sm:text-6xl lg:text-[5.25rem]">
              Ship faster.
              <br />
              Run reliably.
              <br />
              <span className="text-brand-teal">Spend less on cloud.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-teal md:text-xl">
              Anrotex helps growing engineering teams fix slow releases,
              unreliable infrastructure, and rising cloud bills without adding
              another management layer.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                onClick={() =>
                  trackEvent("CTA Click", {
                    source: "homepage-hero",
                    destination: "#contact",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-semibold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
              >
                Book a free strategy call
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#cases"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-navy/20 bg-brand-off-white px-7 py-4 font-semibold text-brand-navy transition hover:-translate-y-0.5 hover:bg-brand-stone"
              >
                See client outcomes
              </a>
            </div>

            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-navy/60">
              <Check className="h-4 w-4 text-brand-teal" />
              One business day response · No sales hand-off
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.12 }}
          >
            <div className="absolute -inset-5 rotate-3 rounded-[2.5rem] bg-brand-yellow" />
            <div
              className="shadow-lift relative min-h-[34rem] overflow-hidden rounded-[2rem] bg-brand-navy p-6 text-brand-off-white md:p-8"
              role="region"
              aria-label="Anrotex services carousel"
              aria-live="off"
              aria-roledescription="carousel"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-brand-off-white/15 pb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-mint">
                        {slide.eyebrow}
                      </p>
                      <p className="mt-1 text-lg font-semibold">{slide.title}</p>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-brand-mint/15 px-3 py-1.5 text-xs font-semibold text-brand-mint">
                      <span className="h-2 w-2 rounded-full bg-brand-yellow" />
                      {slide.status}
                    </div>
                  </div>

                  <SlideContent slideId={slide.id} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="relative mt-7 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index
                        ? "w-9 bg-brand-navy"
                        : "w-2.5 bg-brand-navy/25 hover:bg-brand-navy/50"
                    }`}
                    aria-label={`Show slide ${index + 1}: ${item.title}`}
                    aria-current={activeSlide === index}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="mr-2 text-xs font-bold text-brand-navy/60">
                  {String(activeSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
                <button
                  type="button"
                  onClick={() => changeSlide(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy transition hover:bg-brand-stone"
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => changeSlide(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-brand-off-white transition hover:bg-brand-teal"
                  aria-label="Next slide"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
