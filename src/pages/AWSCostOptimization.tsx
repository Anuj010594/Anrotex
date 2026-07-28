import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  CloudCog,
  Database,
  FileCheck2,
  Gauge,
  Network,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";

const reviewAreas = [
  {
    icon: CircleDollarSign,
    title: "Cost visibility",
    description:
      "Accounts, services, regions, environments, tags, commitments, and unallocated spend.",
  },
  {
    icon: CloudCog,
    title: "EC2 and compute",
    description:
      "Idle capacity, rightsizing, schedules, autoscaling, Graviton fit, and Spot opportunities.",
  },
  {
    icon: Database,
    title: "RDS, EBS, and S3",
    description:
      "Database sizing, storage types, IOPS, snapshots, retention, and lifecycle policies.",
  },
  {
    icon: Network,
    title: "Network and architecture",
    description:
      "NAT Gateways, data transfer, load balancers, cross-zone traffic, and avoidable movement.",
  },
  {
    icon: Gauge,
    title: "EKS and containers",
    description:
      "Pod requests, node utilisation, autoscaling behaviour, and workload efficiency.",
  },
  {
    icon: ShieldCheck,
    title: "Cost guardrails",
    description:
      "Budgets, anomaly alerts, ownership, Infrastructure as Code controls, and review cadence.",
  },
];

const deliverables = [
  "Cost baseline mapped to accounts, workloads, environments, and owners",
  "Prioritised savings register with expected value, effort, and operational risk",
  "EC2, EBS, RDS, S3, EKS, and network findings relevant to your environment",
  "30/60/90-day implementation roadmap with quick wins clearly separated",
  "Commitment coverage review after waste and rightsizing opportunities",
  "Budget, anomaly, tagging, and ownership guardrails to prevent cost regression",
];

const process = [
  {
    step: "01",
    title: "Understand the environment",
    description:
      "We review architecture, workload criticality, growth plans, current spend, and the changes your team can safely support.",
  },
  {
    step: "02",
    title: "Verify the opportunities",
    description:
      "Recommendations are checked against utilisation, performance, reliability, and ownership—not accepted blindly.",
  },
  {
    step: "03",
    title: "Prioritise and implement",
    description:
      "Low-risk savings move first. Higher-impact changes are tested, rolled out safely, and measured after implementation.",
  },
];

const faqs = [
  {
    question: "How much can an AWS cost review save?",
    answer:
      "Savings depend on workload shape, existing commitments, architecture, and how actively the environment has already been optimized. We estimate each opportunity only after reviewing the supporting usage and risk data.",
  },
  {
    question: "Will you need access to our production account?",
    answer:
      "The review can begin with read-only billing, configuration, and utilization data. We agree the minimum access required before work starts and do not make production changes without approval.",
  },
  {
    question: "How long does the initial review take?",
    answer:
      "A focused initial review typically takes 3–7 business days after the required access and context are available. Larger multi-account estates may need a broader discovery phase.",
  },
  {
    question: "Can you implement the recommendations too?",
    answer:
      "Yes. We can work with your engineers to implement and validate the prioritized changes, including Infrastructure as Code, autoscaling, observability, and cost guardrails.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function AwsCostOptimization() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <>
      <SEO
        title="AWS Cost Optimization Services | Anrotex"
        description="Find and remove AWS waste safely. Get a prioritized review of EC2, EKS, RDS, EBS, S3, network costs, commitments, and cloud cost guardrails."
        path="/aws-cost-optimization"
        structuredData={[
          serviceSchema({
            name: "AWS Cost Optimization Services",
            description:
              "AWS cost reviews and implementation support for engineering teams that need to reduce cloud waste without sacrificing reliability.",
            path: "/aws-cost-optimization",
            serviceType: "AWS cost optimization",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "AWS Cost Optimization", path: "/aws-cost-optimization" },
          ]),
          faqSchema,
        ]}
      />
      <Navbar />

      <main className="bg-brand-off-white text-brand-navy">
        <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-28 md:pt-44">
          <div className="pointer-events-none absolute -right-40 top-16 h-[34rem] w-[34rem] rounded-full bg-brand-stone/70" />
          <div className="pointer-events-none absolute -left-28 bottom-0 h-64 w-64 rounded-full bg-brand-mint/60" />
          <div className="container relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                AWS cost optimization
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Find and remove AWS waste—without putting production at risk.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-teal md:text-xl">
                Get a technically verified cost review that connects every
                recommendation to workload behaviour, operational risk, and a
                practical implementation sequence.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  to="/contact?focus=aws-cost"
                  eventSource="aws-service-hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
                >
                  Request a free AWS cost review
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  to="/blog/reduce-aws-costs"
                  eventName="Article Click"
                  eventSource="aws-service-hero"
                  className="inline-flex items-center justify-center rounded-full border border-brand-navy/15 px-7 py-4 font-bold text-brand-navy transition hover:bg-brand-stone"
                >
                  Read the AWS cost guide
                </TrackedLink>
              </div>
              <p className="mt-5 text-sm font-semibold text-brand-navy/60">
                Founder-led · Read-only discovery · Reply within one business day
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-brand-yellow" />
              <div className="relative rounded-[2rem] bg-brand-navy p-7 text-brand-off-white shadow-lift md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
                  Your first output
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  A prioritised opportunity map—not a recommendation dump.
                </h2>
                <div className="mt-7 space-y-4">
                  {[
                    "Where the money is going",
                    "What can change safely",
                    "What should happen first",
                    "How savings will be verified",
                  ].map((item) => (
                    <p
                      key={item}
                      className="flex items-center gap-3 border-b border-brand-mint/15 pb-4 font-semibold text-brand-stone last:border-0 last:pb-0"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-navy">
                        <Check className="h-4 w-4" />
                      </span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-brand-navy/10 bg-brand-stone px-6 py-14">
          <div className="container grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold tracking-[-0.04em]">42%</p>
              <p className="mt-2 font-semibold text-brand-teal">
                lower cloud spend in a selected fintech engagement
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-[-0.04em]">0</p>
              <p className="mt-2 font-semibold text-brand-teal">
                downtime while the optimization work was implemented
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-[-0.04em]">3–7 days</p>
              <p className="mt-2 font-semibold text-brand-teal">
                typical focused review after access is available
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                  What we inspect
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                  The cost drivers behind the bill.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-brand-teal">
                  The review follows spend from the bill into the infrastructure
                  and application decisions creating it.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {reviewAreas.map((area) => (
                  <article
                    key={area.title}
                    className="rounded-[1.5rem] border border-brand-navy/10 bg-brand-stone/45 p-6"
                  >
                    <area.icon className="h-6 w-6 text-brand-teal" />
                    <h3 className="mt-6 text-2xl font-bold">{area.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-teal">
                      {area.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-navy px-6 py-24 text-brand-off-white md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-mint">
                What you receive
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                A plan your engineers can actually execute.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-stone">
                Each finding includes the evidence behind it and the production
                constraint that must be protected.
              </p>
            </div>
            <div className="space-y-3">
              {deliverables.map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-brand-mint/15 bg-brand-off-white/[0.05] p-5 font-semibold text-brand-stone"
                >
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-yellow" />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32">
          <div className="container">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                How the engagement works
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                Savings without reckless changes.
              </h2>
            </div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {process.map((item) => (
                <article
                  key={item.step}
                  className="rounded-[1.75rem] border border-brand-navy/10 bg-brand-stone/45 p-7"
                >
                  <p className="text-sm font-bold text-brand-teal">{item.step}</p>
                  <h3 className="mt-10 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-brand-teal">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-mint px-6 py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Questions before access
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                AWS cost review FAQs.
              </h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFAQ === index;
                return (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-2xl bg-brand-off-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFAQ(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-lg font-bold"
                      aria-expanded={isOpen}
                    >
                      {faq.question}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="px-6 pb-6 leading-relaxed text-brand-teal">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center md:py-32">
          <div className="container max-w-4xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-yellow">
              <SearchCheck className="h-8 w-8" />
            </div>
            <h2 className="mt-7 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
              Find the first safe saving opportunity.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">
              Start with a candid review of the environment, the cost pressure,
              and the evidence already available. No generic savings estimate and
              no hard sell.
            </p>
            <TrackedLink
              to="/contact?focus=aws-cost"
              eventSource="aws-service-bottom"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              Request the free review
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
