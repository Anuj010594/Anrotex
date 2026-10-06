import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import TrackedLink from "@/components/TrackedLink";
import {
  breadcrumbSchema,
  caseStudyArticleSchema,
} from "@/lib/seo";

const caseStudyPath = "/case-studies/fintech-aws-cost-reduction";

const workstreams = [
  {
    icon: Gauge,
    title: "Container and capacity efficiency",
    description:
      "Workload sizing and autoscaling behaviour were reviewed together so savings did not come from simply removing production headroom.",
  },
  {
    icon: Database,
    title: "RDS and caching",
    description:
      "Database capacity and caching behaviour were tuned around actual workload needs rather than isolated service-level recommendations.",
  },
  {
    icon: Layers3,
    title: "Infrastructure as Code",
    description:
      "Terraform made the target configuration repeatable, reviewable, and easier for the client team to own after delivery.",
  },
  {
    icon: GitBranch,
    title: "Safer release flow",
    description:
      "Blue-green delivery reduced release risk while removing the manual friction that had constrained deployment throughput.",
  },
];

const evidenceNotes = [
  "The client is anonymized and identifying architecture details are withheld.",
  "Published outcomes use the engagement metrics Anrotex has approved for this case study.",
  "The 42% and 3× results describe this engagement, not a universal savings or delivery guarantee.",
  "Future recommendations are estimated only after workload, utilization, and operational-risk evidence is reviewed.",
];

export default function FintechAwsCostReduction() {
  const title =
    "FinTech AWS Cost Reduction Case Study: 42% Lower Spend | Anrotex";
  const description =
    "See how Anrotex combined AWS and Kubernetes efficiency, RDS and caching improvements, Terraform, and blue-green delivery to lower cloud spend by 42% and accelerate releases 3×.";

  return (
    <>
      <SEO
        title={title}
        description={description}
        path={caseStudyPath}
        type="article"
        imageAlt="Anrotex fintech AWS cost optimization case study"
        structuredData={[
          caseStudyArticleSchema({
            headline:
              "How a growing fintech platform lowered AWS spend by 42% and released 3× faster",
            description,
            path: caseStudyPath,
            datePublished: "2026-07-28",
            dateModified: "2026-10-06",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            {
              name: "FinTech AWS cost reduction",
              path: caseStudyPath,
            },
          ]),
        ]}
      />
      <Navbar />

      <main className="bg-brand-off-white text-brand-navy">
        <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pb-28 md:pt-44">
          <div className="pointer-events-none absolute -right-32 top-14 h-[30rem] w-[30rem] rounded-full bg-brand-stone/75" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-brand-mint/60" />
          <div className="container relative">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Anonymized client engagement · FinTech · AWS & Kubernetes
            </p>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold leading-[1] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              42% lower AWS spend—with releases moving 3× faster.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-brand-teal md:text-xl">
              A growing payments platform needed to control cloud costs without
              trading away release speed. Anrotex connected infrastructure
              efficiency, database tuning, repeatable configuration, and safer
              delivery into one engineering programme.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                to="/contact?focus=aws-audit"
                eventSource="fintech-case-study-hero"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
              >
                Request an AWS audit
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
              <TrackedLink
                to="/aws-cost-optimization"
                eventName="Service Click"
                eventSource="fintech-case-study-hero"
                className="inline-flex items-center justify-center rounded-full border border-brand-navy/15 px-7 py-4 font-bold transition hover:bg-brand-stone"
              >
                See the audit scope
              </TrackedLink>
            </div>
            <p className="mt-6 text-sm font-semibold text-brand-navy/60">
              Reviewed by Anrotex engineering · Published 28 July 2026 · Updated 6 October 2026
            </p>
          </div>
        </section>

        <section className="border-y border-brand-navy/10 bg-brand-stone px-6 py-14">
          <div className="container grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-5xl font-bold tracking-[-0.05em]">42%</p>
              <p className="mt-2 font-semibold text-brand-teal">
                lower cloud spend
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold tracking-[-0.05em]">3×</p>
              <p className="mt-2 font-semibold text-brand-teal">
                faster releases
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold tracking-[-0.05em]">4</p>
              <p className="mt-2 font-semibold text-brand-teal">
                coordinated engineering workstreams
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                The business constraint
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                Cost control could not become a delivery slowdown.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-brand-teal">
              <p>
                The platform was growing, and leadership needed the AWS bill to
                reflect that growth more efficiently. Engineering still needed
                room to release frequently and operate a production payments
                workload safely.
              </p>
              <p>
                That ruled out a spreadsheet-only exercise. Each saving had to
                be connected to workload behaviour, release mechanics, and the
                configuration the client team would own after the engagement.
              </p>
              <div className="rounded-[1.5rem] border border-brand-navy/10 bg-brand-mint/45 p-6 text-base text-brand-navy">
                <p className="flex items-start gap-3 font-semibold">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-teal" />
                  The programme treated reliability and engineering ownership
                  as constraints, not as trade-offs to revisit after savings
                  were found.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-navy px-6 py-24 text-brand-off-white md:py-32">
          <div className="container">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-mint">
                What changed
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                Four workstreams, evaluated as one system.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-stone">
                Cost, performance, and release safety were reviewed together so
                one improvement did not create a hidden problem elsewhere.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {workstreams.map((workstream) => (
                <article
                  key={workstream.title}
                  className="rounded-[1.75rem] border border-brand-mint/15 bg-brand-off-white/[0.05] p-7"
                >
                  <workstream.icon className="h-7 w-7 text-brand-yellow" />
                  <h3 className="mt-8 text-2xl font-bold">
                    {workstream.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-brand-stone">
                    {workstream.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                Outcome
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
                Lower run rate. Faster path to production.
              </h2>
            </div>
            <div className="space-y-5">
              {[
                "AWS cloud spend was reduced by 42% for the engagement.",
                "Release throughput improved by 3× after the delivery changes.",
                "Terraform left the target infrastructure easier to review, reproduce, and transfer to the client team.",
                "The result came from coordinated engineering changes rather than one isolated discount or commitment purchase.",
              ].map((outcome) => (
                <p
                  key={outcome}
                  className="flex items-start gap-4 rounded-[1.5rem] bg-brand-stone/50 p-6 font-semibold leading-relaxed"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-yellow">
                    <Check className="h-4 w-4" />
                  </span>
                  {outcome}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-mint px-6 py-24 md:py-32">
          <div className="container grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <CircleDollarSign className="h-10 w-10 text-brand-teal" />
              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-5xl">
                Evidence and publication boundaries.
              </h2>
            </div>
            <div className="space-y-3">
              {evidenceNotes.map((note) => (
                <p
                  key={note}
                  className="rounded-2xl bg-brand-off-white p-5 font-semibold leading-relaxed"
                >
                  {note}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 text-center md:py-32">
          <div className="container max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
              Your environment will be different
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight tracking-[-0.04em] md:text-6xl">
              Start with the evidence in your AWS accounts.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-teal">
              The AWS Cost Optimization Audit turns billing, utilization, and
              architecture evidence into a prioritized 30/60/90-day plan.
            </p>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-brand-teal">
              Start with the{" "}
              <TrackedLink to="/blog/reduce-aws-costs#measure-savings" eventName="Article Click" eventSource="fintech-case-study-measurement" className="font-semibold text-brand-navy underline underline-offset-4">
                AWS savings measurement checklist
              </TrackedLink>{" "}
              to define your baseline and performance checks. Then review the{" "}
              <TrackedLink to="/aws-cost-optimization#sample-finding" eventName="Service Click" eventSource="fintech-case-study-scope" className="font-semibold text-brand-navy underline underline-offset-4">
                audit scope and sample finding
              </TrackedLink>{" "}
              to see the evidence and assumptions an actionable recommendation needs.
            </p>
            <TrackedLink
              to="/contact?focus=aws-audit"
              eventSource="fintech-case-study-bottom"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-4 font-bold text-brand-off-white transition hover:-translate-y-0.5 hover:bg-brand-teal"
            >
              Request the audit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
