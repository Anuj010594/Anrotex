import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Clock3,
  CloudCog,
  Database,
  Eye,
  FileCheck2,
  Gauge,
  ListChecks,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
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
  "Prioritised savings register with evidence, cost assumptions, confidence, effort, and operational risk",
  "EC2, EBS, RDS, S3, EKS, and network findings relevant to your environment",
  "30/60/90-day implementation roadmap with quick wins clearly separated",
  "Commitment coverage review after waste and rightsizing opportunities",
  "Budget, anomaly, tagging, and ownership guardrails with a plan to measure savings",
];

const process = [
  {
    step: "01",
    title: "Confirm fit and scope",
    description:
      "A short founder-led call confirms the accounts, cost pressure, engineering constraints, and the decision the audit needs to support.",
  },
  {
    step: "02",
    title: "Open read-only discovery",
    description:
      "We agree the minimum billing, utilization, configuration, and architecture context needed. The audit does not require write access.",
  },
  {
    step: "03",
    title: "Verify the opportunities",
    description:
      "Recommendations are checked against utilisation, performance, reliability, and ownership—not accepted blindly.",
  },
  {
    step: "04",
    title: "Deliver the decision pack",
    description:
      "Your team receives the savings register, 30/60/90-day roadmap, implementation sequence, and an executive readout.",
  },
];

const fitSignals = [
  "AWS spend is rising faster than product or customer growth",
  "Engineering sees recommendations but lacks time to validate risk",
  "Multiple accounts, teams, tags, or commitments obscure ownership",
  "A finance or leadership decision needs defensible savings evidence",
];

const accessPrinciples = [
  {
    icon: Eye,
    title: "Read-only by default",
    description:
      "Billing, utilization, and configuration evidence are reviewed without changing production resources.",
  },
  {
    icon: ShieldCheck,
    title: "Minimum necessary access",
    description:
      "The access plan is agreed before discovery and scoped to the accounts and services included in the audit. We do not request root credentials.",
  },
  {
    icon: Users,
    title: "Your team keeps control",
    description:
      "No recommendation is implemented during the audit. Changes require a separate approval and rollout plan.",
  },
];

const faqs = [
  {
    question: "Is the AWS Cost Optimization Audit free?",
    answer:
      "The initial fit call is free. If the audit is a good fit, we provide a fixed-scope proposal based on the accounts, services, and decision your team needs to make.",
  },
  {
    question: "How much can the audit save?",
    answer:
      "Savings depend on workload shape, existing commitments, architecture, and how actively the environment has already been optimized. We estimate each opportunity only after reviewing the supporting usage and risk data.",
  },
  {
    question: "Are estimated savings the same as a lower AWS invoice?",
    answer:
      "No. Each estimate states its billing basis, usage window, and commitment assumptions. Reducing covered usage can release capacity without reducing an existing commitment payment. After an approved implementation, compare actual costs and workload volume over agreed periods to establish the realized result.",
  },
  {
    question: "Will you need access to our production account?",
    answer:
      "The review can begin with read-only billing, configuration, and utilization data. We agree the minimum access required before work starts and do not make production changes without approval.",
  },
  {
    question: "How long does the audit take?",
    answer:
      "A focused audit typically takes 3–7 business days after the required access and context are available. Larger multi-account estates are scoped separately before work begins.",
  },
  {
    question: "What happens after the audit?",
    answer:
      "Your team can implement the roadmap independently, or Anrotex can provide a separate implementation engagement covering Infrastructure as Code, autoscaling, observability, and cost guardrails.",
  },
];

export default function AwsCostOptimization() {
  return (
    <>
      <SEO
        title="AWS Cost Optimization Audit | Anrotex"
        description="Get a read-only AWS cost optimization audit with evidence-backed findings, savings assumptions, risk checks, and a 30/60/90-day implementation plan."
        path="/aws-cost-optimization"
        structuredData={[
          serviceSchema({
            name: "AWS Cost Optimization Audit",
            description:
              "A fixed-scope AWS cost audit for engineering teams that need verified savings opportunities and a practical implementation roadmap without sacrificing reliability.",
            path: "/aws-cost-optimization",
            serviceType: "AWS cost optimization audit",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "AWS Cost Optimization", path: "/aws-cost-optimization" },
          ]),
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
                Fixed-scope AWS Cost Optimization Audit
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[1] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Find the AWS waste worth fixing—and leave with a plan.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-teal md:text-xl">
                Identify savings opportunities with supporting evidence, clear
                cost assumptions, and a 30/60/90-day implementation roadmap.
                Focused audits typically take 3–7 business days once the agreed
                access and workload context are ready.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <TrackedLink
                  to="/contact?focus=aws-audit"
                  eventSource="aws-audit-hero"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
                >
                  Request the audit
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  to="/blog/reduce-aws-costs"
                  eventName="Article Click"
                  eventSource="aws-audit-hero"
                  className="inline-flex items-center justify-center rounded-full border border-brand-navy/15 px-7 py-4 font-bold text-brand-navy transition hover:bg-brand-stone"
                >
                  Read the AWS cost guide
                </TrackedLink>
              </div>
              <p className="mt-5 text-sm font-semibold text-brand-navy/60">
                Free fit call · Fixed-scope proposal · Read-only discovery
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rotate-3 rounded-[2rem] bg-brand-yellow" />
              <div className="relative rounded-[2rem] bg-brand-navy p-7 text-brand-off-white shadow-lift md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
                  The audit at a glance
                </p>
                <h2 className="mt-4 text-3xl font-bold">
                  Know what to change, why, and how to verify it.
                </h2>
                <div className="mt-7 space-y-4">
                  {[
                    "3–7 business day assessment",
                    "Read-only billing and utilization review",
                    "Prioritized savings register",
                    "30/60/90-day implementation roadmap",
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
              <p className="text-4xl font-bold tracking-[-0.04em]">3–7 days</p>
              <p className="mt-2 font-semibold text-brand-teal">
                typical delivery after access is ready
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-[-0.04em]">6 areas</p>
              <p className="mt-2 font-semibold text-brand-teal">
                reviewed across cost, compute, data, network, EKS, and guardrails
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold tracking-[-0.04em]">30/60/90</p>
              <p className="mt-2 font-semibold text-brand-teal">
                day implementation sequence included
              </p>
            </div>
          </div>
        </section>

        <section id="sample-finding" className="scroll-mt-28 bg-brand-stone px-6 py-24 md:py-32">
          <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">Inside the savings register</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">What a useful finding looks like.</h2>
              <p className="mt-6 text-lg leading-relaxed text-brand-teal">
                A recommendation needs an owner, evidence, assumptions, and a
                validation plan before it belongs in an implementation backlog.
              </p>
              <TrackedLink to="/blog/reduce-aws-costs#rightsizing-example" eventName="Article Click" eventSource="aws-audit-sample" className="mt-7 inline-flex items-center gap-2 font-bold underline underline-offset-4">
                Follow the worked EC2 example <ArrowRight className="h-4 w-4 shrink-0" />
              </TrackedLink>
            </div>
            <article className="rounded-[2rem] border border-brand-navy/10 bg-brand-off-white p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-teal">Illustrative finding · Not a client result</p>
              <h3 className="mt-4 text-2xl font-bold">Test a smaller EC2 size while retaining three replicas</h3>
              <dl className="mt-7 space-y-5 text-sm leading-relaxed">
                <div><dt className="font-bold">Evidence and confidence</dt><dd className="mt-1 text-brand-teal">In this example, 28 representative days show a highest five-minute CPU value of 30% and memory reaching 2.5 GiB on each 4-vCPU, 8-GiB instance. A 2-vCPU, 4-GiB candidate needs performance and failover testing before approval.</dd></div>
                <div><dt className="font-bold">Estimated benefit and assumptions</dt><dd className="mt-1 text-brand-teal">At hypothetical rates of $0.20 and $0.12 per hour, three replicas running 730 hours cost $438.00 and $262.80 respectively. Potential compute reduction: $175.20/month. This assumes no existing commitment coverage and excludes storage, transfer, support, tax, and testing costs.</dd></div>
                <div><dt className="font-bold">Risk and decision owner</dt><dd className="mt-1 text-brand-teal">The workload owner checks memory headroom, network and disk limits, peak latency, error rates, and recovery capacity. The previous configuration remains the rollback option.</dd></div>
                <div><dt className="font-bold">Acceptance and measurement</dt><dd className="mt-1 text-brand-teal">Approve a staged rollout only after agreed performance limits pass. Compare actual billed usage, effective cost, and workload volume across representative periods, including costs that moved to other services.</dd></div>
              </dl>
            </article>
          </div>
          <div className="container mt-14 grid gap-5 md:grid-cols-3">
            {[
              { title: "Estimated opportunity", description: "A forecast tied to resource usage, rates, and commitment assumptions. Overlapping recommendations are reconciled before totals are presented." },
              { title: "Approved implementation", description: "A selected change with an owner, test criteria, rollout sequence, and rollback plan. Your team can deliver it or scope implementation with Anrotex." },
              { title: "Measured outcome", description: "A post-change comparison using the same cost basis and workload scope. Recurring cost, cash payments, and one-off implementation costs are reported separately." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-brand-navy/10 p-6">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-brand-teal">{item.description}</p>
              </div>
            ))}
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

        <section className="bg-brand-stone px-6 py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                When this audit is useful
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                Built for a real cost decision.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-brand-teal">
                The audit works best when leadership needs a defensible view of
                savings and engineering needs a sequence that protects
                reliability.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fitSignals.map((signal) => (
                <p
                  key={signal}
                  className="flex items-start gap-3 rounded-[1.5rem] bg-brand-off-white p-6 font-semibold leading-relaxed"
                >
                  <ListChecks className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  {signal}
                </p>
              ))}
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
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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

        <section className="border-y border-brand-navy/10 bg-brand-off-white px-6 py-24 md:py-32">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                  Access and change control
                </p>
                <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                  Evidence in. No surprise changes out.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-brand-teal">
                  We agree the accounts, services, reporting period, and
                  deliverables before discovery. Your team controls access
                  throughout the review.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {accessPrinciples.map((principle) => (
                  <article
                    key={principle.title}
                    className="rounded-[1.5rem] border border-brand-navy/10 bg-brand-stone/45 p-6"
                  >
                    <principle.icon className="h-6 w-6 text-brand-teal" />
                    <h3 className="mt-7 text-xl font-bold">{principle.title}</h3>
                    <p className="mt-3 leading-relaxed text-brand-teal">
                      {principle.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl bg-brand-stone/55 p-7">
                <h3 className="text-2xl font-bold">What to prepare</h3>
                <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed text-brand-teal">
                  <li>The in-scope accounts, regions, services, and workload owners.</li>
                  <li>Billing history, ideally three complete months, plus existing Savings Plans and reservations.</li>
                  <li>Representative utilization data, including memory where needed, and known peak or batch periods.</li>
                  <li>Performance targets, recovery requirements, maintenance windows, and planned migrations.</li>
                </ul>
                <p className="mt-5 leading-relaxed text-brand-teal">Discovery uses agreed read-only permissions or scoped exports. Missing evidence is recorded as a limitation on the affected finding.</p>
              </div>
              <div className="rounded-2xl bg-brand-stone/55 p-7">
                <h3 className="text-2xl font-bold">Where the audit ends</h3>
                <p className="mt-5 leading-relaxed text-brand-teal">The audit includes the baseline, prioritized findings, measurement plan, roadmap, and readout for the agreed scope.</p>
                <p className="mt-4 leading-relaxed text-brand-teal">Production changes, commitment purchases, application rewrites, ongoing incident support, and post-implementation measurement are scoped separately. Accounts or services added later may change the proposal and timeline.</p>
                <p className="mt-4 leading-relaxed text-brand-teal">Your engineers can implement the roadmap independently. If you need delivery support, we agree the changes, access, validation period, and handover before work begins.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-yellow px-6 py-20">
          <div className="container grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]">
                Selected engagement outcome
              </p>
              <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">
                42% lower AWS spend and 3× faster releases for a growing
                fintech platform.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-navy/75">
                See the cost, infrastructure, and delivery changes behind the
                result in the full anonymized engagement story.
              </p>
            </div>
            <TrackedLink
              to="/case-studies/fintech-aws-cost-reduction"
              eventName="Case Study Click"
              eventSource="aws-audit-proof"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              Read the case study
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
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
              {faqs.map((faq, index) => (
                <details
                  key={faq.question}
                  open={index === 0}
                  className="overflow-hidden rounded-2xl bg-brand-off-white"
                >
                  <summary className="cursor-pointer px-6 py-5 text-lg font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal">
                    {faq.question}
                  </summary>
                  <p className="px-6 pb-6 leading-relaxed text-brand-teal">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center md:py-32">
          <div className="container max-w-4xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-yellow">
              <Clock3 className="h-8 w-8" />
            </div>
            <h2 className="mt-7 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
              Put a defensible savings plan in front of your team.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">
              Start with a free fit call. If the audit is right for your
              environment, you receive a fixed-scope proposal before any access
              is requested.
            </p>
            <TrackedLink
              to="/contact?focus=aws-audit"
              eventSource="aws-audit-bottom"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              Request the AWS audit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
